import express, { Request, Response } from 'express'
import * as keys from '../../config/keys'
import Stripe from 'stripe'

const apiKey = typeof keys.secretKey !== 'undefined' ? keys.secretKey : ''
const stripe = new Stripe(apiKey, { apiVersion: '2022-08-01' })

const app = express()
const PORT = process.env.PORT || 3030

const checkoutPayment = async (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*')
  const amount = req.query.amount || 0
  const name = req.query.name?.toString() || ''
  try {
    const customer = await stripe.customers.create({ name })
    const paymentIntent = await stripe.paymentIntents.create({
      amount: +amount,
      currency: 'eur',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    })
    return res.status(200).json({
      paymentIntent: paymentIntent.client_secret,
      customerId: customer.id,
    })
  } catch (error) {
    console.log('error', error)
  }
}

app.post('/checkout', checkoutPayment)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})

import Stripe from 'stripe'
import express, { Request, Response } from 'express'

import * as keys from '../../config/keys'

const apiKey = keys.secretKey || ''
const stripe = new Stripe(apiKey, { apiVersion: '2022-08-01' })

const app = express()
const PORT = process.env.PORT || 3030

const checkoutPayment = async (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*')
  let customerId: string | undefined
  let oldCustomerId: string | undefined

  const queryId = req.query.id?.toString() || ''
  const queryAmount = req.query.amount || 0
  const queryName = req.query.name?.toString() || ''
  
  try {
    if (queryId) {
      const { id } = await stripe.customers.retrieve(queryId)
      oldCustomerId = id
      console.log('oldCustomerId', id)
    }
    if (!oldCustomerId) { 
      const { id } = await stripe.customers.create({ name: queryName })
      customerId = id
      console.log('customerId', id)
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: +queryAmount,
      currency: 'eur',
      customer: customerId || oldCustomerId,
      automatic_payment_methods: {
        enabled: true,
      },
    })
    return res.status(200).json({
      paymentIntent: paymentIntent?.client_secret,
      customerId: customerId || oldCustomerId,
    })
  } catch (error) {
    console.log('error', error)
  }
}

app.post('/checkout', checkoutPayment)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})

const express = require('express')
const keys = require("../config/keys")
const stripe = require('stripe')(keys.secretKey)
const app = express()
const PORT = process.env.PORT || 3030

const checkoutPayment = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const amount = req.query.amount
  const name = req.query.name
  try {
    const customer = await stripe.customers.create({ name })

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
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

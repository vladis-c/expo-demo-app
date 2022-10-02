export type StripePaymentParamsType = {
  paymentIntent: string | null
  customerId: string
}

export type StripeCustomerParamsType = {
  name: string,
  customerId: string | undefined
}

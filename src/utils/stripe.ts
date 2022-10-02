import {
  StripeCustomerParamsType,
  StripePaymentParamsType,
} from '../types/types'

export const fetchStripeParams = async (
  amount: string,
  customer: StripeCustomerParamsType
) => {
  const { name, customerId } = customer
  try {
    const response = await fetch(
      `http://localhost:3030/checkout?amount=${amount}00&name=${name}&id=${customerId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data: StripePaymentParamsType = await response.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

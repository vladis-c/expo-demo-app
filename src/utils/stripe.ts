export const fetchStripeParams = async (amount: string, name: string) => {
  try {
    const response = await fetch(
      `http://localhost:3030/checkout?amount=${amount}00&name=${name}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

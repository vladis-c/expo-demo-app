import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Alert, } from 'react-native'
import { useStripe } from '@stripe/stripe-react-native'
import { fetchStripeParams } from '../utils/stripe'

const StripeCheckout = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null)

  const handlePayment = async (price: string) => {
    try {
      const data = await fetchStripeParams(price, "John")
      await initPaymentSheet({
        customerId: data?.customerId,
        paymentIntentClientSecret: data?.paymentIntent ? data?.paymentIntent : "",
        merchantDisplayName: "Merchant from Finland",
        defaultBillingDetails: {
          address: {
            country: "FI"
          }
        }
      })
      openPaymentSheet()
    } catch (error) {
      console.log("error", error)
    } finally {
      setPaymentSuccess(null)
    }
  }

  const openPaymentSheet = async () => {
    const response = await presentPaymentSheet()
    if (response?.error) {
      setPaymentSuccess(false)
      console.log("error in pres. payment", response?.error)
    } else {
      setPaymentSuccess(true)
    }
  }

  useEffect(() => {
    if (paymentSuccess) {
      Alert.alert("Succesfully paid")
    }
    if (paymentSuccess === false) {
      Alert.alert("Error occured")
    }
    setPaymentSuccess(null)
  }, [paymentSuccess])

  return (
    <View style={styles.container}>
      <Text>This is an Expo + Stripe tutorial</Text>
      <Button
        onPress={() => {
          handlePayment("15")
        }}
        title="$15"
      />
      <Button
        onPress={() => {
          handlePayment("30")
        }}
        title="$30"
      />
    </View>
  )
}

export default StripeCheckout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
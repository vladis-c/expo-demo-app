import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import { fetchStripeParams } from './src/utils/stripe'
import * as keys from "./config/keys"

const App = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null)

  const handlePayment = async (price: string) => {
    try {
      const data = await fetchStripeParams(price, "John")
      await initPaymentSheet({
        customerId: data.customerId,
        paymentIntentClientSecret: data.paymentIntent,
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
    if (response.error) {
      setPaymentSuccess(false)
      console.log("error in pres. payment", response)
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
  }, [paymentSuccess])

  return (
    <StripeProvider publishableKey={keys.publishableKey ? keys.publishableKey : ""}>
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
    </StripeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App

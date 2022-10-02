import { StripeProvider, } from '@stripe/stripe-react-native'
import React from 'react'

import * as keys from "./config/keys"
import StripeCheckout from './src/components/StripeCheckout'

const App = () => {
  return (
    <StripeProvider publishableKey={keys.publishableKey || ""}>
      <StripeCheckout />
    </StripeProvider>
  )
}



export default App

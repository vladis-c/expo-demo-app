import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button onPress={() => { }} title="$15" />
      <Button onPress={() => { }} title="$30" />
    </View>
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

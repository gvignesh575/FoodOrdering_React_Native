import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const ProductScreen = () => {
  
  const { id } = useLocalSearchParams();
  
  return (
    <View>
      <Stack.Screen options={{ title: 'Details: ' + id }} />
      <Text>Product Page : {id}</Text>
    </View>
  )
}

export default ProductScreen
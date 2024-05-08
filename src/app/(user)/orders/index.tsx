import orders from '@/assets/data/orders'
import React from 'react'
import { FlatList, Text } from 'react-native'

const OrdersPage = () => {
  return (
    <FlatList
    data={orders}
    renderItem={({ item }) => 
    
    <Text>{item.id}</Text> }
    />
  )
}

export default OrdersPage
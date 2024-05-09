import orders from '@/assets/data/orders'
import React from 'react'
import { FlatList, Text } from 'react-native'
import OrderItemListItem from '@/src/components/OrderListItem'




const OrdersPage = () => {
  
  return (
    <FlatList
    data={orders}
    renderItem={({ item }) => 
    <OrderItemListItem order={item} />
    }
    />
  )
}

export default OrdersPage
import orders from '@/assets/data/orders'
import React from 'react'
import { ActivityIndicator, FlatList, Text } from 'react-native'
import OrderItemListItem from '@/src/components/OrderListItem'
import { useMyOrderList } from '@/src/api/orders'




const OrdersPage = () => {
  const { data: orders, isLoading, error } = useMyOrderList();

  if(isLoading)
    {
      return <ActivityIndicator />
    }

  if(error)
    {
      return <Text>Failed to Fetch</Text>
    }





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
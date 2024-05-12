import orders from '@/assets/data/orders'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, Text } from 'react-native'
import OrderItemListItem from '@/src/components/OrderListItem'
import { useAdminOrderList } from '@/src/api/orders'
import { supabase } from '@/src/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions'




const OrdersPage = () => {
  

  const { data: orders, isLoading, error } = useAdminOrderList({archived: false});


  useInsertOrderSubscription();
  

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
import orders from '@/assets/data/orders';
import { useOrderDetails } from '@/src/api/orders';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

const OrderDetailsPage = () => {
  
    const { id: idString } = useLocalSearchParams();

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);

    if(!order)
        {
            return <Text>Not found</Text>;
        }

    if(isLoading)
        {
            return <ActivityIndicator />
        }
    
    if(error)
        {
            return <Text>Failed to Fetch</Text>
        }

    return (
    <View style={{ padding:10, gap: 20 }}>
        <Stack.Screen options={{ title: `Order #${id}` }} />
        <FlatList data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} 
        />
    }
    contentContainerStyle={{ gap:10 }}
    ListHeaderComponent={() => <OrderListItem order={order} /> }
        />
    </View>
  )
}

export default OrderDetailsPage
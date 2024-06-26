import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import { useState } from 'react';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';
import RemoteImage from '@/src/components/RemoteImage';

const sizes: PizzaSize[] = ['S','M','L','XL']

const ProductScreen = () => {
  
  const { id: idString } = useLocalSearchParams();
  
  const id = parseFloat(typeof idString === "string" ? idString : idString[0])

  const { addItem } = useCart(); 

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const {data: product} = useProduct(id);
  
  const addToCart = () => {
    if (!product) {
      return;
    }

    addItem(product,selectedSize);
    router.push('/cart');
  }

  if (!product)
    {
      return <Text>Product Not found!</Text>
    }


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{title: 'Menu',

        headerRight: () => (
          <Link href={`/(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="pencil"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
        }}

        />
      <Stack.Screen options={{ title: product?.name  }} />
      <RemoteImage path={product?.image}
      fallback={defaultPizzaImage}
      style={styles.image}
      />
     
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 15,
  },
  image:{
    width: '100%',
    aspectRatio: 1,
    objectFit: 'contain'
  },
  price: {
    fontSize: 18,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
  }

});


export default ProductScreen
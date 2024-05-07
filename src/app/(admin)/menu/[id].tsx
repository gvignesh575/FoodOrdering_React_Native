import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import { useState } from 'react';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { useRouter } from 'expo-router';

const sizes: PizzaSize[] = ['S','M','L','XL']

const ProductScreen = () => {
  
  const { id } = useLocalSearchParams();
  
  const { addItem } = useCart(); 

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const product = products.find((p) => p.id.toString() === id);

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
      <Stack.Screen options={{ title: product?.name  }} />
      <Image source={{uri : product.image || defaultPizzaImage}}
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
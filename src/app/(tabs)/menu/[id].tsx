import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import { useState } from 'react';
import Button from '@/src/components/Button';

const sizes = ['S','M','L','XL']

const ProductScreen = () => {
  
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState('M');

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
   console.warn('Adding to cart, size: ', selectedSize); 
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

      <Text
      style={{fontSize:18}}
      >Select size</Text>
      <View style={styles.sizes}>
      {
        sizes.map((size) => 
        <Pressable
        onPress={() => {setSelectedSize(size)}}
        key={size}
        style={[styles.size, { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }]}>
          <Text
          style={styles.sizeText}
          >{size}</Text>
        </Pressable>
        )
      }
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button 
      onPress={addToCart}
      text="Add to cart" />
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
    fontWeight: 'bold',
    marginTop:'auto'
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:2
  },
  size:{
    backgroundColor: 'gainsboro',
    width:50,
    aspectRatio:1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500'
  }


});


export default ProductScreen
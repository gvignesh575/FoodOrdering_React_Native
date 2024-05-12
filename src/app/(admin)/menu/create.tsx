import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import React, { useEffect, useState } from 'react'
import { Text,StyleSheet,View,TextInput, Image,Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products';

const CreateProductScreen = () => {
 
    const [name, setName] = useState<string | null>('');
    const [price, setPrice] = useState<string | null>('');
    const [errors, setErrors] = useState<string | null>('');
    const [image, setImage] = useState<string | null>(null);


    const { id: idString } = useLocalSearchParams();

    const id = parseFloat(typeof idString === "string" ? idString : idString?.[0])

    const isUpdating = !!id;


    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { data: updatingProduct } = useProduct(id);
    const { mutate: deleteProduct } = useDeleteProduct();
    const router = useRouter();

    useEffect(() => {
        if(updatingProduct)
            {
                setName(updatingProduct.name);
                setPrice(updatingProduct.price.toString());
                setImage(updatingProduct.image);

            }
    },[updatingProduct])


    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const validateInput = () => {
        if(!name)
            {
                setErrors("Name is required!");
                return false;
            }
        if(!price)
            {
                setErrors('Price is required!');
                return false;
            }
        if(isNaN(parseFloat(price)))
            {
               setErrors('Price is not a number!');
               return false;

            }
        return true;  
    }

    const onCreate = () => {
        if (!validateInput())
            {
             return;   
            }
        
        insertProduct({ name, price : parseFloat(price), image }, {
            onSuccess : () => {
                resetFields();
                router.back();
            }
        });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };


      const onUpdate = () => {
        if (!validateInput())
            {
             return;   
            }
        
        updateProduct(
            {
                id,name, price: parseFloat(price),image
            },
            {
                onSuccess : () => {
                    resetFields();
                    router.back();
                }
            }
        )    
    }

    const onSubmit = () => {
        if(isUpdating)
            {
                onUpdate();
            }
        else{
            onCreate();
        }
    }


    const onDelete = () => {
        deleteProduct(id, {
            onSuccess : () => {
                resetFields();
                router.replace("/(admin)");
            }
        });
    }


    const confirmDelete = () =>
    {
        Alert.alert("Confirm","Are you sure you want to delete this product",[
           { text: 'Cancel'},
           {
            text: "Delete",
            style: "destructive",
            onPress: onDelete
           }
        ]);
    }
    
 
    return (

   <View style={styles.container}>
       
       <Stack.Screen
       options={{ title: isUpdating ? 'Update Product' : 'Create Product' }}
       />
       
       <Image
       source={{uri: image || defaultPizzaImage}}
       style={styles.image}
       />

       <Text 
       onPress={pickImage}
       style={styles.textButton}>Select Image</Text>
       
       <Text style={styles.label}>Name</Text>
       <TextInput 
       value={name}
       onChangeText={setName}
       placeholder="Name"
       style={styles.input}
       />
       <Text style={styles.label}>Price ($)</Text>
       <TextInput placeholder="9.99"
       value={price}
       onChangeText={setPrice}
       style={styles.input}
       keyboardType='numeric'
       />
       <Text style={{color: 'red'}}>{errors}</Text>
       <Button 
       text={isUpdating ? "Update" : "Create"}
        onPress={onSubmit}
       />
       {isUpdating && 
       <Text 
       onPress={confirmDelete}
       style={styles.textButton}>Delete</Text>
       }
   </View>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    image:{
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint
    },
    input: {
        backgroundColor:'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16
    }
})


export default CreateProductScreen
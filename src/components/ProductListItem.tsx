import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Product, Tables } from "../types";
import { Link, useSegments } from "expo-router";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Tables<'products'>;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  
  const segments = useSegments();
  const navigate = segments[0];
  
  return (
    <Link href={`/${navigate}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    margin: 5,
    maxWidth: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const ScreenProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = () => {
    const URL = "https://fakestoreapi.com/products";

    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Algo Salió Mal en la Conexión");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vegetta777</Text>

      {isLoading ? (
        <ActivityIndicator color="#369b22" size="large" />
      ) : error ? (
        <Text style={styles.errorStyle}>{error}</Text>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={products}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.productText}>{item.title}</Text>
              <Text style={styles.priceText}>Precio: ${item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ScreenProductsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a2daf',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    paddingBottom: 10,
    textAlign: 'center',
  },
  cardContainer: {
    marginTop: 20,
    backgroundColor: '#6d1cb8',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    height: 200,
    width: 200,
  },
  errorStyle: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  productText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },
  priceText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

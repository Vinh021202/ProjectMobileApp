import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CheckoutScreen = ({ navigation, route }) => {

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,  // Ẩn header
    });
  }, [navigation]);

  
  const { cartItems } = route.params;

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác nhận thanh toán</Text>
      
      {cartItems.map((item) => (
        <View key={item.id} style={styles.cartItem}>
             <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style = {{
            alignItems : 'flex-start',
        }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{`$${(item.price * item.quantity).toFixed(2)}`}</Text>
        </View>
        </View>
      ))}

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Tổng cộng:</Text>
        <Text style={styles.totalPrice}>{`$${getTotalPrice()}`}</Text>
      </View>

      {/* Add any additional fields for user information, e.g., address, payment method, etc. */}
      
      {/* Checkout button */}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => {
          // Implement the logic for processing the payment
          // After successful payment, you can navigate to a success screen
          navigation.navigate('checkout');
        }}
      >
        <Text style={styles.checkoutButtonText}>Thanh toán ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    gap: 20
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  checkoutButton: {
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;

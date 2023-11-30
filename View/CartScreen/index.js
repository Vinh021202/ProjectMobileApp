import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image , Pressable } from 'react-native';

const CartScreen = ({ navigation , route }) => {
    const [cartItems, setCartItems] = useState(route.params ? route.params.cartItems : []);
    const { email } = route.params;

    useEffect(() => {
      navigation.setOptions({
        headerShown: false,  // Ẩn header
      });
    }, [navigation]);

  useEffect(() => {
    // Lấy dữ liệu giỏ hàng khi thành phần được tạo
    fetchCartData();
  }, [email]);

  const fetchCartData = async () => {
    try {
      // Thay đổi URL API nếu cần thiết
      const apiUrl = `http://localhost:3000/users/${email}/cart`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      // Xử lý lỗi khi lấy dữ liệu giỏ hàng
      console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
    }
  };
   //xoa
   const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };
  
  // Sữa
  const updateQuantity = (itemId, newQuantity) => {
    // Đảm bảo giá trị mới không nhỏ hơn 1
    newQuantity = Math.max(1, newQuantity);
  
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  
    setCartItems(updatedCart);
  };
  

  const getTotalPrice = () => {
    if (!cartItems || cartItems.length === 0) {
      return 0;
    }
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderCartItem = ({ item }) => (
    <View style = {{
        flexDirection: "row",
        width: "100%",
        height: 100,
        borderRadius: 10,
        borderColor: "#E0E0E0",
        borderWidth: 1,
        marginBottom: 15,
        alignItems: "center",
        backgroundColor: "white",
    }}>
    <View style={styles.cartItem}>
    <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style = {{
            alignItems : 'flex-start',
        }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{`$${(item.price * item.quantity).toFixed(2)}`}</Text>
        <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
            <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
                </View>
        </View>
        <View  style = {{
            alignItems : 'flex-end',
            alignContent: 'center',
        }}>
           <Pressable onPress={() => removeFromCart(item.id)}>
            <Image source={require('../../assets/Del.png')} style = {{ width : 30 , height : 30}} />
            </Pressable>  
        </View>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
       <View style = {{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 alignItems: "center",
                 marginTop : 5,
            }}
            >
             <Pressable
                style={{
                    width : '10%',
                    padding : 10,
                    borderRadius : 20,
                    marginTop : 5,
                }}
                onPress={()=>{
                    navigation.navigate('Home' , {
                      email : route.params.email,
                    })
                }}>
                  <Image
                  source={require('../../assets/vecter.png')}
                    style={{
                      width : 15 , height : 15
                    }}
                  
            />
            </Pressable>
            </View>
      <Text style={styles.title}>Giỏ hàng</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Thành Tiền:</Text>
        <Text style={styles.totalPrice}>{`$${getTotalPrice().toFixed(2)}`}</Text>
      </View>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => {
          // Xử lý thanh toán
          navigation.navigate('CheckoutScreen', { cartItems: cartItems , email : route.params.email, });
        }}
      >
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ff8c00",
    borderRadius: 20,
    width : '30%',
    left : 120,
  },
  quantityButton: {
    backgroundColor: '#ff8c00',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default CartScreen;

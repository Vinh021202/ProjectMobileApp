import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';


const ProductDetail = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,  // Ẩn header
    });
  }, [navigation]);
  const { email } = route.params;
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  
  // thêm số lượng
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  //thêm vào giỏ hàng
  const addToCart = async () => {
    const apiUrl = `http://localhost:3000/users/${email}/cart`;
    const payload = {
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: quantity,
    };
    console.log('Payload:', payload); // Log dữ liệu để kiểm tra
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Thêm bất kỳ headers cần thiết khác
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Sản phẩm đã được thêm vào giỏ hàng thành công
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
      } else {
        // Xử lý lỗi khi thêm vào giỏ hàng
        console.error('Lỗi khi thêm vào giỏ hàng:', response.status);
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu API
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
    navigation.navigate('CartScreen' , {
      email : route.params.email,
    })
  };

  return (
    <View style={styles.container}>
        <View style = {{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 alignItems: "center",
                 marginTop : 15,
            }}
            >
             <Pressable
                style={{
                    width : '10%',
                    padding : 10,
                    borderRadius : 20,
                    marginTop : 15,
                }}
                onPress={()=>{
                    navigation.navigate('Home' ,{ email : route.params.email,})
                }}>
                  <Image
                  source={require('../../assets/vecter.png')}
                    style={{
                      width : 20 , height : 20
                    }}
                  
            />
            </Pressable>
            
            <Pressable
                style={{
                    width : '10%',
                    padding : 10,
                    borderRadius : 20,
                    marginTop : 15,
                }}
                onPress={()=>{
                    navigation.navigate('CartScreen' , { email : route.params.email,});
                }}>
              <Image
                    source={require('../../assets/IconGioHang.png')}
                    style={{
                        width: 30,
                        height: 30,
                    }}   
            />
            </Pressable>
            </View>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style= {{
        
      }}>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        {product && (
      <Text style={styles.productPrice}>{`Giá: $${product.price ? product.price.toFixed(2) : 'N/A'}`}</Text>
      )}
        <View style = {{
          paddingTop : 30,
        }}>
        <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  productDetails: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  addToCartButton: {
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartButtonText: {
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

export default ProductDetail;

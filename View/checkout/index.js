import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Checkout = ({ navigation,route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn header
    });
  }, [navigation]);


  const { email, totalPrice } = route.params;

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = async () => {

    
    try {
      const orderData = {
        fullName,
        address,
        phoneNumber,
        // Add other order details as needed
      };
     const response = await fetch(`http://localhost:3000/users/${email}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Đơn hàng được tạo thành công
        console.log('Đơn hàng được tạo thành công!');
      } else {
        // Xử lý lỗi khi tạo đơn hàng
        console.error('Lỗi khi tạo đơn hàng:', response.status);
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu API
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }

    // Sau khi tạo đơn hàng, bạn có thể chuyển hướng người dùng đến màn hình khác
    navigation.navigate('checkout2', {
      fullName,
      address,
      phoneNumber,
      email : route.params.email,
      totalPrice : route.params.totalPrice,
    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style = {{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 alignItems: "center",
                 marginTop : 10,
            }}
            >
             <Pressable
                style={{
                    width : '10%',
                    padding : 10,
                    borderRadius : 20,
                }}
                onPress={()=>{
                    navigation.navigate('Home' , {
                      email : route.params.email
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
      <View style={styles.style1}>
        <h1>Vận chuyển</h1>
      </View>
      <View style={styles.style2}>
          <View style={{
          marginLeft:20,
          }}>
            <Text style={{
              textAlign : 'center',
            }}>
              <h2> Chi Tiết Vận Chuyển</h2>
            </Text>
          </View>
          </View>
            <View style = {styles.style3}>
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontFamily: 'Inter', fontSize: 14, fontStyle: 'normal', fontWeight: 600, lineHeight: '20px' }}>
          Họ tên
        </Text>
        <View 
          style = {{
            backgroundColor:'#F5F5F5',
                                    borderRadius:12,
                                    height:56,
                                    justifyContent:'center',
                                    alignItems:'center',
          }}
        >
        <TextInput
          placeholder="Nguyen Van A"
          style={{
            color:'#888',
            height:20,
            width:'90%',
          }}
          onChangeText={text => setFullName(text)}
          value={fullName}
        />
      </View>
            </View>
            </View>
        <View style = {styles.style4}>
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontFamily: 'Inter', fontSize: 14, fontStyle: 'normal', fontWeight: 600, lineHeight: '20px' }}>
          Địa chỉ
        </Text>
        <View style = {{
             backgroundColor:'#F5F5F5',
             borderRadius:12,
             height:56,
             justifyContent:'center',
             alignItems:'center',
        }}>

        <TextInput
          placeholder="Phuong 4, Quan Go Vap"
          style={{
            color:'#888',
            height:20,
            width:'90%',
          }}
          onChangeText={text => setAddress(text)}
          value={address}
        />
      </View>
      </View>
      </View>
      <View style = {{
        flex : 1,
      }}>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontFamily: 'Inter', fontSize: 14, fontStyle: 'normal', fontWeight: 600, lineHeight: '20px' }}>
          Số điện thoại
        </Text>
        <View style={{
                                    backgroundColor:'#F5F5F5',
                                    borderRadius:12,
                                    height:56,
                                    justifyContent:'center',
                                    alignItems:'center',
                }}>
        <TextInput
          placeholder="0000000000"
          style={{
            color:'#888',
            height:20,
            width:'90%',
          }}
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType="phone-pad"
        />
      </View>
        </View>
      </View>
      
      <View style={styles.style5}>


      </View>
      <View style={{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Pressable style={{
            borderRadius:20,
            backgroundColor:'#F9881F',
            width:335,
            height:51,
            justifyContent:'center',
                alignItems:'center',
        }} onPress={handlePayment}>
            <Text style={{
                     color:'#FFF',
                     textAlign:'center',
                     fontFamily:'Sk-Modernist',
                     fontSize:14,
                     fontStyle:'normal',
                     fontWeight:700,
            }}>Thanh Toán </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',

  },
  style1:{
    flex:1,
    marginLeft:32,
    justifyContent:'center',
  },
  style2:{
    flex:1,
  },
  style3:{
    flex:1,
  },
  style4:{
    flex:1,
  },
  style5:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
  }

});
export default Checkout;

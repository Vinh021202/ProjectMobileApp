import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Checkout = ({ navigation }) => {
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
     const response = await fetch('http://localhost:3000/orders', {
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
    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style = {{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 alignItems: "center",
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
                    navigation.navigate('Home')
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
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems:'center',
          }}>
            <Text style={{
                flexDirection:'row',
            }}>
              <h2>Chi Tiết Vận Chuyển</h2>
            </Text>
          </View>
          </View>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontFamily: 'Inter', fontSize: 14, fontStyle: 'normal', fontWeight: 600, lineHeight: '20px' }}>
          Họ tên
        </Text>
        <TextInput
          placeholder="Nguyen Van A"
          style={{
            color: '#888',
            backgroundColor: '#F5F5F5',
            borderRadius: 12,
            height: 56,
          }}
          onChangeText={text => setFullName(text)}
          value={fullName}
        />
      </View>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontFamily: 'Inter', fontSize: 14, fontStyle: 'normal', fontWeight: 600, lineHeight: '20px' }}>
          Địa chỉ
        </Text>
        <TextInput
          placeholder="Phuong 4, Quan Go Vap"
          style={{
            color: '#888',
            backgroundColor: '#F5F5F5',
            borderRadius: 12,
            height: 56,
          }}
          onChangeText={text => setAddress(text)}
          value={address}
        />
      </View>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontFamily: 'Inter', fontSize: 14, fontStyle: 'normal', fontWeight: 600, lineHeight: '20px' }}>
          Số điện thoại
        </Text>
        <TextInput
          placeholder=""
          style={{
            color: '#888',
            backgroundColor: '#F5F5F5',
            borderRadius: 12,
            height: 56,
          }}
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType="phone-pad"
        />
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
    marginTop:32,
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
    flex:3,
  },
  style5:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    justifyContent:'space-around',
  }

});
export default Checkout;

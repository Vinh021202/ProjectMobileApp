import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const Checkout2 = ({ navigation , route}) => {

  const { email } = route.params;
  const { fullName, address, phoneNumber } = route.params;
  const [fullNumber, setFullNumber] = useState('');
  const [namestk, setNamestk] = useState('');
  const [date, setDate] = useState('');
  const [CVV, setCVV] = useState('');

  const handlePayment = async () => {
    try {
      const orderData = {
        fullNumber,
        namestk,
        date,
        CVV,
      };

      const response = await fetch(`http://localhost:3000/users/${email}/orders`, {
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
    navigation.navigate('OrderSummary', {
      email : route.params.email,
      fullName: route.params.fullName,
      address: route.params.address,
      phoneNumber: route.params.phoneNumber,
      CVV,
      fullNumber,
      namestk,
      date,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Phương thức thanh toán</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số thẻ</Text>
        <TextInput
          placeholder="**** **** **** 9111"
          style={styles.input}
          onChangeText={(text) => setFullNumber(text)}
          value={fullNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên Tài Khoản</Text>
        <TextInput
          placeholder="Nguyen Van A"
          style={styles.input}
          onChangeText={(text) => setNamestk(text)}
          value={namestk}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <Text style={styles.label}>Ngày phát hành</Text>
          <TextInput
            placeholder="05/25"
            style={styles.input}
            onChangeText={(text) => setDate(text)}
            value={date}
          />
        </View>
        <View style={styles.columnContainer}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            placeholder="1234"
            style={styles.input}
            onChangeText={(text) => setCVV(text)}
            value={CVV}
          />
        </View>
      </View>
      <View style = {{
          marginTop : 30,
          paddingTop : 150,
        }}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handlePayment} style={styles.button}>
          <Text style={styles.buttonText}>Thanh Toán </Text>
        </Pressable>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontFamily: 'Sk-Modernist',
    fontSize: 24,
    fontWeight: '700',
  },
  inputContainer: {
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  columnContainer: {
    flex: 1,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    color: '#888',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    height: 56,
    paddingLeft: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#F9881F',
    width: 335,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Sk-Modernist',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default Checkout2;

import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import React, { useEffect } from 'react';

const OrderSummary = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,  // Ẩn header
    });
  }, [navigation]);

  const {
    fullName,
    address,
    phoneNumber,
    fullNumber,
    namestk,
    date,
    CVV,
  } = route.params || {};
  const { email, totalPrice } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
        <Pressable
          style={{
            width: '10%',
            padding: 10,
            borderRadius: 20,
          }}
          onPress={() => {
            navigation.navigate('Home', { email: route.params.email });
          }}
        >
          <Image
            source={require('../../assets/vecter.png')}
            style={{
              width: 15, height: 15
            }}
          />
        </Pressable>
      </View>
      <Text style={styles.headerText}>Checkout</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{fullName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Địa Chỉ:</Text>
          <Text style={styles.value}>{address}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Số Điện Thoại:</Text>
          <Text style={styles.value}>{phoneNumber}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mã Thẻ:</Text>
          <Text style={styles.value}>{fullNumber}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tên Chủ Thẻ:</Text>
          <Text style={styles.value}>{namestk}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Cvv:</Text>
          <Text style={styles.value}>{CVV}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Thành Tiền :</Text>
          <Text style={styles.value}>{`${totalPrice}`}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('PaymentSuccessScreen', { email: route.params.email });
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Xác Nhận Và Tiếp Tục</Text>
        </Pressable>
      </View>

      {/* Khoảng cách giữa nút và đáy màn hình */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    padding: 20,
  },
  headerText: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    alignItems : 'center',
  },
  summaryContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Bold',
    fontSize: 17,
    fontWeight: '600',
    color: '#444',
    margin : 5,
  },
  value: {
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    flexShrink: 1,
    marginLeft: 8,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
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
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default OrderSummary;

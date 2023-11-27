import React from 'react';
import { View, Text, StyleSheet , Pressable} from 'react-native';

const OrderSummary = ({ route, navigation }) => {
  const {
    fullName,
    address,
    phoneNumber,
    fullNumber,
    namestk,
    date,
    CVV,
  } = route.params;

  return (
    <View style={styles.container}>
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
      </View>
      <View style = {{
        marginTop : 30,
        paddingTop : 150,
      }}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => {
                    navigation.navigate('PaymentSuccessScreen');
                  }}
        style={styles.button}>
          <Text style={styles.buttonText}>Xác Nhận Và tiếp tục </Text>
        </Pressable>
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
  headerText: {
    fontFamily: 'Sk-Modernist',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
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
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    fontFamily: 'Inter',
    fontSize: 16,
    flexShrink: 1, // Allow text to shrink if it overflows
    marginLeft: 8,
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

export default OrderSummary;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const Signup = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
          headerShown: false,  // Ẩn header
        });
      }, [navigation]);

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');


  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Lỗi Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      alert('Lỗi Mật khẩu và xác nhận mật khẩu phải giống nhau');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      // Giả sử JSON Server của bạn phản hồi với dữ liệu người dùng đã tạo
      console.log('email đã tạo:', data);

      alert('Thành công Đăng ký thành công');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Lỗi trong quá trình đăng ký:', error);
      alert('Lỗi Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <LinearGradient colors={['#D6F8D6', '#FFFFFF']} style={styles.linearGradient}>
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký </Text>
      </View>
      <View style = {{
         paddingTop : 30,
      }}>
      <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Nhập Tên </Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={name}
        onChangeText={setName}
      />
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Nhập Email </Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={email}
        onChangeText={setEmail}
      />
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Nhập PassWord </Text>
      <TextInput
        style={styles.input}
        placeholder=""
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Nhập Lại PassWord </Text>
      <TextInput
        style={styles.input}
        placeholder=""
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      </View>
      </View>
      
      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
      <TouchableOpacity style={styles.skipButton} 
            onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.skipText}> Đăng Nhập Với Tài Khoản có sẵn</Text>
        </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center', // Center the content
      },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000', // Match the text color to the image
    marginVertical: 20,
  },

  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Match the text color to the image
    marginBottom: 5,
    marginLeft: 10, // Adjust the label position
  },
  input: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderColor: '#000', // Match the border color to the image
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFC107', // Match the button color to the image
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white', // Match the button text color to the image
  },
  skipButton: {
    paddingTop : 15,
    textAlign : 'center',
  },
  skipText: {
    fontSize: 22,
    color: 'red', // Match the skip text color to the image
  },
});

export default Signup;

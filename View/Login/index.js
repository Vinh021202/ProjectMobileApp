import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Login = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,  // Ẩn header
    });
  }, [navigation]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill all fields")
    } else {
      setShowPassword(true);
      const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
      const data = await res.json();
      setShowPassword(false);
      if (!data || data.length === 0) {
        alert("Email hoặc tài khoản của bạn không chính xác");
      } else {
        navigation.navigate("Home", {
          email: email,
          password: password,
          name: name,
        });
        setEmail("");
        setPassword("");
      }
    }
  }

  return (
    <LinearGradient colors={['#FFFFFF','#D6F8D6']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <Image
          source={require("../../assets/buger3.jpg")}
          style={styles.image}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nhập Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mật Khẩu</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder=""
            placeholderTextColor="#888"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.skipText}>Tạo tài khoản</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center', // Center horizontally
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000', // Match the text color to the image
    marginVertical: 20,
  },
  image: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Adjusted margin for better spacing
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    color: '#000', // Adjusted text color
  },
  button: {
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  skipButton: {
    paddingTop: 15,
  },
  skipText: {
    fontSize: 15,
    color: '#000',
  },
});

export default Login;

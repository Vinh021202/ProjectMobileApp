import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Button, StyleSheet, TextInput , TouchableOpacity} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';



const Login = ({ navigation, route }) => {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false,  // Ẩn header
        });
      }, [navigation]);
  const [name , setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  

  async function handleLogin(){
    if(email.trim() === "" || password.trim() === ""){
        alert("Please fill all fields")
    }else{
        setShowPassword(true);
        const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
        const data = await res.json();
        setShowPassword(false);
        if (!data || data.length === 0){
            alert("Email hoặc tài khoản của bạn không chính xác");
        } else {
            navigation.navigate("Home", {
              email: email,
              password: password,
              name : name,
            });
            setEmail("");
            setPassword("");
        }
    }
}


return (
    <LinearGradient colors={['#D6F8D6', '#FFFFFF']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <Image 
          source={require("../../assets/buger.png")}
          style={styles.image}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput style={styles.input}
           onChangeText={text => setEmail(text)} 
           value={email} 
            />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput style={styles.input} 
            secureTextEntry
            onChangeText={text => setPassword(text)} 
            value={password} 
           />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
    width: 250, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'contain', // Ensure the image scales correctly
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
  },
  skipText: {
    fontSize: 22,
    color: '#000', // Match the skip text color to the image
  },
});


export default Login;

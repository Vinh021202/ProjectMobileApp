import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button , Pressable} from "react-native";

const MenuComponent = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    fetch(`http://localhost:3000/users/${email}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [email]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View>
          <Pressable 
            onPress={()=>{
              navigation.navigate('Home')
          }}>
          <Image source={require('../../assets/vecter.png')}
           style = {{
            width : 15 , height : 15
           }} 
          />
          </Pressable>
      </View>
    <Image source={require('../../assets/user.png')} style={styles.avatar} />
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
    </View>
    <Button title="Đăng xuất" onPress={() => {
                    navigation.navigate('Login');
                  }} />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
  },
});

export default MenuComponent;

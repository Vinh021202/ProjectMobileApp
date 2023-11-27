import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button} from "react-native";

const UserProfile = ({ loggedInUserId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information for the logged-in user
    fetch(`http://localhost:3000/users/${loggedInUserId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [loggedInUserId]);

  // const handleLogout = () => {
  //   // Thực hiện các hành động đăng xuất (ví dụ: xóa phiên người dùng, chuyển hướng đến màn hình đăng nhập)
  //   // Bạn có thể gọi hàm onLogout để kích hoạt hành động đăng xuất trong thành phần cha
  //   onLogout();
  // };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <Image source={require('../../assets/user.png')} style={styles.avatar} />
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
    </View>
    <Button title="Đăng xuất" onPress={() => {
                    navigation.navigate('Checkout1');
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

export default UserProfile;

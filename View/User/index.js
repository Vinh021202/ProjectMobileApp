import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, SafeAreaView , Linking} from "react-native";

const MenuComponent = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn header
    });
  }, [navigation]);

  const { email, name } = route.params ?? {};
  
  console.log("name: ");


  const openLink = () => {
    // Mở liên kết trong trình duyệt mặc định của thiết bị
    Linking.openURL('https://www.facebook.com/profile.php?id=100071725960458');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home', { email: route.params.email, name: route.params.name })}>
          <Image source={require('../../assets/vecter.png')} style={styles.backIcon} />
        </Pressable>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
          <View style={styles.profileText}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuItem}>
        <Pressable style={styles.menuItemPressable}
        onPress={()=> {navigation.navigate('OrderSummary', {email});
          console.log('click');
        }}>
          <Text style={styles.menuItemText}>Thông tin cá nhân</Text>
          <Image source={require('../../assets/vecter1.jpg')} style={styles.arrowIcon} />
        </Pressable>
      </View>

      <View style={styles.menuItem}>
        <Pressable style={styles.menuItemPressable}
        onPress={()=> {navigation.navigate('CartScreen', {email});
        console.log('click');
        }}>
          <Text style={styles.menuItemText}>Giỏ hàng</Text>
          <Image source={require('../../assets/vecter1.jpg')} style={styles.arrowIcon} />
        </Pressable>
      </View>

      <View style={styles.menuItem}>
        <Pressable style={styles.menuItemPressable}
        onPress={()=> {navigation.navigate('Checkout2', {email})
         console.log('click');
        }}>
          <Text style={styles.menuItemText}>Phương thức thanh toán</Text>
          <Image source={require('../../assets/vecter1.jpg')} style={styles.arrowIcon} />
        </Pressable>
      </View>

      <View style={styles.menuItem}>
        <Pressable style={styles.menuItemPressable} onPress={openLink}>
          <Text style={styles.menuItemText}>Liên hệ với chúng tôi</Text>
          <Image source={require('../../assets/vecter1.jpg')} style={styles.arrowIcon} />
        </Pressable>
      </View>

      <View style={styles.menuItem}>
        <Pressable style={styles.menuItemPressable}
        onPress={()=> { navigation.navigate('Login', {email})
             console.log('click');
      }}
        
        >
          <Text style={styles.menuItemText}>Đăng Xuất</Text>
          <Image source={require('../../assets/vecter1.jpg')} style={styles.arrowIcon} />
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('Home' , {
              email: route.params.email,
              name : route.params.name,
            });
            console.log('click');
          }}
        >
          <Text style={styles.buttonText}>Quay về trang chủ</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  profileContainer: {
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: '#9AD983',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  profileText: {
    marginLeft: 20,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#FFF',
    fontSize: 20,
    fontWeight : 'bold',
  },
  menuItem: {
    height: 60,
    marginTop: 20,
  },
  menuItemPressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 600,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
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
    fontWeight: 700,
  },
});

export default MenuComponent;

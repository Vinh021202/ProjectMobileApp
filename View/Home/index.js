import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

const Home = ({ navigation , route }) => {
  const { email ,  name} = route.params;


  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn header
    });
  }, [navigation]);
  
  const [popularProducts, setPopularProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [activeType, setActiveType] = useState('Burger'); // Thêm activeType

  const menuData = [
    { type: 'Pizza', label: 'Pizza', icon: require('../../assets/a1.png') },
    { type: 'Burger', label: 'Burger', icon: require('../../assets/a2.png') },
    { type: 'Sausage', label: 'Sausage', icon: require('../../assets/a3.png') },
    { type: 'samosa', label: 'Samosa', icon: require('../../assets/a4.png') },
  ];

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => setPopularProducts(data))
      .catch(error => console.error('Lỗi khi lấy danh sách sản phẩm phổ biến:', error));
  }, []);

  const handleProductPress = (item) => {
    navigation.navigate('ProductDetail', {
      product: item, // Truyền thông tin sản phẩm khi chuyển màn hình
      email : route.params.email
    });
  };

  const handleMenuPress = (type) => {
    setActiveType(type);
    setShowAll(false);
  };

  const filteredProducts = popularProducts.filter(product => product.type === activeType);
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 6);

  const renderProductItem = ({ item }) => (
    <Pressable onPress={() => handleProductPress(item.id)}>
      <View style={styles.productCard}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{`Giá: $${item.price}`}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
      <Pressable
        style={styles.headerIcon}
        onPress={() => navigation.navigate('User', { email: route.params.email, name: route.params.name })}
      >
        <Image source={require('../../assets/Group.png')} style={styles.headerImage} />
      </Pressable>

      <Pressable
        style={styles.headerIcon}
        onPress={() => navigation.navigate('CartScreen', { email: route.params.email })}
      >
        <Image source={require('../../assets/IconGioHang.png')} style={styles.headerImage} />
      </Pressable>
    </View>

    <View style={styles.titleContainer}>
      <Text style={styles.title}>Happy food</Text>
    </View>

    <View style={styles.menuContainer}>
      {menuData.map(item => (
        <TouchableOpacity
          key={item.type}
          style={[styles.menuItem, activeType === item.type && styles.activeMenuItem]}
          onPress={() => handleMenuPress(item.type)}
        >
          <Image source={item.icon} style={styles.menuIcon} />
          <Text>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View style={styles.productContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sản phẩm phổ biến</Text>
      </View>
          <FlatList
            data={displayedProducts}
            numColumns={4}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleProductPress(item)}>
                <View style={styles.productCard}>
                  <Image source={item.image} style={styles.productImage} />
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={{ margin: 15 }}>Top 10 món ăn được yêu thích nhất</Text>
                  <View style={{flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap : 100, }}>
                    <Image source={require('../../assets/Star 1.png')} style={{ width: 14, height: 14, marginRight: 5 }} />
                    <Image source={require('../../assets/Heart.png')} style={{ width: 14, height: 14 }} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          
        </View>
        </ScrollView>
        <View style = {{
                paddingTop : 10,
                flex : 1,
            }}>
          {!showAll && (
            <TouchableOpacity style={styles.seeAllButton} onPress={() => setShowAll(true)}>
              <Text style={styles.seeAllText}>View all</Text>
            </TouchableOpacity>
          )}
          </View>
        {/* View product */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding : 10,
    margin: 10,

  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  headerIcon: {
    width: '10%',
    padding: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  titleContainer: {
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  menuItem: {
    width: 81,
    height: 109,
    borderRadius: 50,
    backgroundColor: '#F0E3C1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeMenuItem: {
    backgroundColor: 'lightgreen',
  },
  menuIcon: {
    width: 27,
    height: 27,
  },
  productContainer: {
    marginTop: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllButton: {
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  seeAllText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  productCard: {
    width: '167px',
    height: '200px',
    backgroundColor: '#faf0e6',
    borderRadius: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10px',
    marginVertical: '10px',
  },
  productImage: {
    width: 110,
    height: 110,
    borderRadius: 50,
  },
  productName: {
    fontFamily: 'bold',
    fontSize: '15px',
    fontWeight: '400',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
});

export default Home;
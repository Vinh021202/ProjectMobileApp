import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

const Home = ({ navigation , route }) => {
  
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
      <View style={{ margin: 20 }}>
      <View style = {{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 alignItems: "center",
                 marginTop : 15,
            }}
            >
             <Pressable
                style={{
                    width : '10%',
                    padding : 10,
                    borderRadius : 20,
                    marginTop : 15,
                }}
                onPress={()=>{
                    navigation.navigate('MenuComponent')
                }}>
                  <Image
                  source={require('../../assets/Group.png')}
                    style={{
                      width : 30 , height : 30
                    }}
                  
            />
            </Pressable>
            
            <Pressable
                style={{
                    width : '10%',
                    padding : 10,
                    borderRadius : 20,
                    marginTop : 15,
                }}
                onPress={()=>{
                    navigation.navigate('CartScreen');
                }}>
              <Image
                    source={require('../../assets/IconGioHang.png')}
                    style={{
                        width: 30,
                        height: 30,
                    }}   
            />
            </Pressable>
            </View>
        {/* Tieu de  */}
        <View style={{ flex: 1 }}>
          <Text>
            <h1>Happy food</h1>
          </Text>
        </View>
        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuData.map(item => (
            <TouchableOpacity
              key={item.type}
              style={[
                styles.menuItem,
                activeType === item.type && styles.activeMenuItem, // Thêm kiểm tra activeType để áp dụng màu xanh
              ]}
              onPress={() => handleMenuPress(item.type)}
            >
              <Image source={item.icon} style={styles.menuIcon} />
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* View product */}
        <View style={{ marginTop: 40 }}>
          <View>
            <Text>
              <h2>Sản phẩm phổ biến</h2>
            </Text>
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
                                alignItems: "center", }}>
                    <Image source={require('../../assets/Star 1.png')} style={{ width: 14, height: 14, marginRight: 5 }} />
                    <Image source={require('../../assets/Heart.png')} style={{ width: 14, height: 14 }} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
            <View style = {{
                paddingTop : 30,
            }}>
          {!showAll && (
            <TouchableOpacity style={styles.seeAllButton} onPress={() => setShowAll(true)}>
              <Text style={styles.seeAllText}>View all</Text>
            </TouchableOpacity>
          )}
          </View>
        </View>
        {/* View product */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
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
    backgroundColor: 'lightgreen', // Màu xanh khi mục được chọn
  },
  menuIcon: {
    width: 27,
    height: 27,
  },
  productCard: {
    width: '167px',
    height: '200px',
    backgroundColor: '#F7BA8326',
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
  popularProductsContainer: {
    marginTop: 40,
  },
  popularProductCard: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllButton: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  seeAllText: {
    color: '#FFF',
    fontWeight: 'bold',
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
  showAllText: {
    color: '#3498db',
  },
});

export default Home;
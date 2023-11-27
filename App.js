import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from './View/Loading';
import Login from './View/Login';
import Home from './View/Home';
import MenuComponent from './View/MenuComponent';
import ProductDetail from './View/ProductDetail';
import CartScreen from './View/CartScreen';
import CheckoutScreen from './View/CheckoutScreen';
import PaymentSuccessScreen from './View/PaymentSuccessScreen';
import Signup from './View/Signup';
import Checkout from './View/checkout';
import checkout2 from './View/checkout2';
import OrderSummary from './View/OrderSummary';


const Stack = createNativeStackNavigator ();
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Thực hiện các công việc tải dữ liệu ở đây
    // Sau khi tải xong, đặt isLoading thành false để ẩn loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Giả sử việc tải mất 3 giây
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
          {isLoading ? (
          <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ title: 'Đăng nhập' }} />
        )} 
           <Stack.Screen name="Signup" component={Signup} options={{Signup: false}}/>   
           <Stack.Screen name="Home" component={Home} options={{Home: false}}/> 
          <Stack.Screen name="MenuComponent" component={MenuComponent} options={{MenuComponent: false}}/> 
           <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ProductDetail: false}}/>
             
            <Stack.Screen name="CartScreen" component={CartScreen} options={{CartScreen: false}}/> 
           <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{CheckoutScreen: false}}/> 
           <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} options={{PaymentSuccessScreen: false}}/> 
           <Stack.Screen name="checkout" component={Checkout} options={{checkout: false}}/> 
           <Stack.Screen name="checkout2" component={checkout2} options={{checkout2: false}}/> 
           <Stack.Screen name="OrderSummary" component={OrderSummary} options={{OrderSummary: false}}/> 
      </Stack.Navigator>
    </NavigationContainer>


  );
};

export default App;
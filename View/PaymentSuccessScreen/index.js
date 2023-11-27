import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView } from 'react-native';


const PaymentSuccessScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={{
            flex:2,
        }}>

        </View>
        <View style={{
            flex:2,
            justifyContent:'center',
            alignItems:'flex-end',
        }}>
        <Image source={require('../../assets/Group 457.png')} style={{
            width:185,
            height:165,
        }}></Image>
        </View>
        <View style={{
            flex:2,
            justifyContent:'center',
            alignItems:'center',
        }}>
        <Text style={{
            textAlign:'center',

        }}><h2>Đặt hàng thành công</h2></Text>
        
        </View>
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'flex-start',
            marginLeft:60,
            marginRight:60,
        }}>
            <Text style={{
                textAlign:'center',
                fontSize:15,
                fontStyle:'normal',
                fontWeight:400,
                fontFamily:'DM Sans',
            }}>Hãy ngồi và thư giãn trong khi đơn hàng của bạn đang được thực hiện. Sẽ mất 5 phút trước khi bạn nhận được nó</Text>
        </View>
        <View style={{
            flex:1,
        }}>

        </View>
        <View style={{
             flex:1,
             alignItems: 'center',
             justifyContent: 'center',

        }}>
            <Pressable style={{
                borderRadius:20,
                backgroundColor:'#F9881F',
                width:335,
                height:51,
                justifyContent:'center',
                    alignItems:'center',
                 }}onPress={() => {
                    navigation.navigate('Checkout1');
                  }}
                 >
                <Text style={{
                                    color:'#FFF',
                                    textAlign:'center',
                                    fontFamily:'Sk-Modernist',
                                    fontSize:14,
                                    fontStyle:'normal',
                                    fontWeight:700,
                }}>Go to back home</Text>
            </Pressable>
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    margin:'auto',
  },
});
export default PaymentSuccessScreen;
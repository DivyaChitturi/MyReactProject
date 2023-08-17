import {} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {cartActions} from '../Features/cartSlice';
import {width, widthToDp} from 'rn-responsive-screen';
import Header from '../../src/Components/Header';
import CartItem from '../Components/CartItem';

const CartScreen = props => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  let total = 0;

  return (
    <View>
      {/* <View style={{flex: 1}}>
      <FlatList
        data={cartItems}
        renderItem={({item, index}) => {
          return (
            <View>
              <View
                style={{
                  height: 60,
                  marginHorizontal: 10,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}}>
                  <Text>{item.item.name}</Text>
                  <Text>{item.item.details}</Text>
                </View>
                <Text style={{width: 80}}>Quantity: {item.quantity}</Text>
                <Text style={{width: 50}}>{item.item.price}</Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(cartActions.addToCart(item.item));
                  }}
                  style={{
                    width: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Text numberOfLines={2}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(cartActions.removeFromCart(item.item));
                  }}
                  style={{
                    width: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Text numberOfLines={2}>Remove</Text>
                </TouchableOpacity>
              </View>
              <View></View>
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          dispatch(cartActions.clearCart());
        }}>
        <Text style={styles.loginText}>Clear Cart</Text>
      </TouchableOpacity>
    </View> */}
      <View>
        <SafeAreaView style={[styles.container]}>
          {/* SchrollView is used in order to scroll the content */}
          {/* Using the reusable header component */}
          <Header title="My Cart" />

          {/* Mapping the products into the Cart component */}
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.text}>
                {/* <SafeAreaView> */}
                <FlatList
                  data={cartItems}
                  renderItem={({item, index}) => {
                    total = total + item.item.price;
                    return <CartItem product={item.item} />;
                  }}
                />
                {/* </SafeAreaView> */}
              </Text>
            </ScrollView>
          </SafeAreaView>
          <View style={styles.footer}>
            <Text style={styles.price}>${total}</Text>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  loginBtn: {
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
    flexDirection: 'flex-end',
  },
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthToDp(90),
    marginTop: 10,
  },
  total: {
    borderTopWidth: 1,
    paddingTop: 10,
    borderTopColor: '#E5E5E5',
    marginBottom: 10,
  },
  cartTotalText: {
    fontSize: widthToDp(4.5),
    color: '#989899',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
  price: {
    fontSize: widthToDp(4),
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});

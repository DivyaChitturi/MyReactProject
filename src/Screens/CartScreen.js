import {} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {cartActions} from '../Features/cartSlice';

const cartScreen = props => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

  return (
    <View style={{flex: 1}}>
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
    </View>
  );
};

export default cartScreen;

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
});

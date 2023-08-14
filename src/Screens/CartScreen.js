import {} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const cartScreen = props => {
  const cartItems = useSelector(state => state.cart.cartItems);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={cartItems}
        renderItem={({item, index}) => {
          return (
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
            </View>
          );
        }}
      />
    </View>
  );
};

export default cartScreen;

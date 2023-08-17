import {useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {cartActions} from '../Features/cartSlice';

const itemlist = [
  {
    name: 'Macbook',
    details: 'Macbook pro with core i9',
    price: 2000,
  },
  {
    name: 'iPhone',
    details: 'iphone 14 pro',
    price: 1000,
  },
  {
    name: 'Vacuum Cleaner',
    details: 'Less power consumption, more cleaning',
    price: 500,
  },
  {
    name: 'iPad',
    details: 'Sleek and smart',
    price: 800,
  },
  {
    name: 'Microwave',
    details: 'less power consumptin, more cooking',
    price: 500,
  },
  {
    name: 'Iron',
    details: 'less power consumption',
    price: 200,
  },
  {
    name: 'LED TV',
    details: 'Reliable true colors',
    price: 1200,
  },
  {
    name: 'Washing Machine',
    details: 'less power consumption',
    price: 800,
  },
];

const ListScreen = props => {
  const dispatch = useDispatch();

  const [myListData, setMyListData] = useState(itemlist);
  const [isLoading, setIsLoading] = useState(false);

  const fetchListFromApi = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    fetchListFromApi();
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('CartScreen');
        }}>
        <Text>Go to cart</Text>
      </TouchableOpacity>

      <FlatList
        data={myListData}
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
                <Text>{item.name}</Text>
                <Text>{item.details}</Text>
              </View>
              <Text style={{width: 50}}>{item.price}</Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(cartActions.addToCart(item));
                }}
                style={{
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text numberOfLines={2}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};
export default ListScreen;

import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {heightToDp, width, widthToDp} from 'rn-responsive-screen';
let total = 0;
export default function CartItem({product}) {
  console.log('product' + product.name);

  return (
    <View style={styles.container}>
      {/* <Image source={{uri: product.thumbnail}} style={styles.image} /> */}
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description}>
            {product.details} • ${product.price / 100}
          </Text>
        </View>
        <View style={styles.footer}>
          <View>
            <Text>
              <Image
                src={'/Users/itc-consultant/Downloads/Plus.svg'}
                //style={styles.image}
              />
            </Text>
            <Text style={styles.quantity}>{product.quantity}</Text>
            <Text>
              <Image
                src={'/Users/itc-consultant/Downloads/Minus.svg'}
                //style={styles.image}
              />
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#e6e6e6',
    width: widthToDp('90%'),
  },
  image: {
    width: widthToDp(10),
    height: heightToDp(10),
    borderRadius: 1,
  },
  title: {
    fontSize: widthToDp(4),
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    marginLeft: widthToDp(3),
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: heightToDp(2),
    width: widthToDp(50),
  },
  description: {
    fontSize: widthToDp(3.5),
    color: '#8e8e93',
    marginTop: heightToDp(2),
  },

  price: {
    fontSize: widthToDp(4),
  },
  quantity: {
    fontSize: widthToDp(4),
  },
});

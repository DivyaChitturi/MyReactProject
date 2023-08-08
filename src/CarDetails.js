import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const CarDetails = props => {
  const {route} = props;
  console.log(route);
  return (
    <View>
      <Text style={styles.text}>
        Car Name: {JSON.stringify(route.params.carName)}
      </Text>
      <Text style={styles.text}>
        Car Image:
        <Image source={{uri: route.params.carImage}} style={styles.image} />
      </Text>
      <Text style={styles.text}>
        Car Model: {JSON.stringify(route.params.carModel)}
      </Text>
      <Text style={styles.text}>
        Car Color: {JSON.stringify(route.params.carColor)}
      </Text>
    </View>
  );
};

export default CarDetails;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#121212',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    width: 80,
    marginTop: 10,
    padding: 6,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
  },
});

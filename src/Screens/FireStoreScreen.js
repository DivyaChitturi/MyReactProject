import {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import styles from '../../styles';

const FireStoreScreen = props => {
  const [usersList, setUsersList] = useState([]);
  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userDetailsCollection = await firestore()
        .collection('UserDetails')
        .get();

      setUsersList(userDetailsCollection._docs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Firestore Data</Text>
      <Text>User Name</Text>
      <Text>User Location</Text>
      <FlatList
        data={usersList}
        renderItem={({item, index}) => {
          console.log(item);

          return (
            <View
              style={{
                height: 60,
                marginHorizontal: 80,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{item._data.userName}</Text>
              <Text>{item._data.userLocation}</Text>
            </View>
          );
        }}
      />
      <TextInput
        placeholder="User Name"
        value={userName}
        style={styles.textInput}
        onChangeText={changedText => {
          setUserName(changedText);
        }}
      />

      <TextInput
        placeholder="User Location"
        value={userLocation}
        style={styles.textInput}
        onChangeText={changedText => {
          setUserLocation(changedText);
        }}
      />

      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => {
          firestore()
            .collection('UserDetails')
            .add({
              userName,
              userLocation,
            })
            .then(() => {
              console.log('User added!');
              fetchUsers();
            })
            .catch(error => {
              console.log(error);
            });
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: 'red',
            letterSpacing: 0.5,
          }}>
          Submit
        </Text>
      </TouchableOpacity>
      <Animated.View style={[styles.formButton]}>
        <Pressable
          onPress={() => {
            props.navigation.navigate('MapScreen');
          }}>
          <Text style={styles.buttonText}>Map View</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default FireStoreScreen;

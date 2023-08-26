import {useEffect, useState} from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FireStoreScreen = () => {
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
        // .where('carType', '==', 'Hatchback')
        .get();

      setUsersList(userDetailsCollection._docs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>firestore</Text>
      <FlatList
        data={usersList}
        renderItem={({item, index}) => {
          console.log(item);

          return (
            <View>
              <Text>{item._data.userName}</Text>
              <Text>{item._data.userLocation}</Text>
            </View>
          );
        }}
      />
      <TextInput
        placeholder="User Name"
        value={userName}
        style={{
          height: 40,
          backgroundColor: 'yellow',
          margin: 10,
        }}
        onChangeText={changedText => {
          setUserName(changedText);
        }}
      />

      <TextInput
        placeholder="User Location"
        value={userLocation}
        style={{
          height: 40,
          backgroundColor: 'yellow',
          margin: 10,
        }}
        onChangeText={changedText => {
          setUserLocation(changedText);
        }}
      />

      <TouchableOpacity
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
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FireStoreScreen;

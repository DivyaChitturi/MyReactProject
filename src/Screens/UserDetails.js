import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import PersistantHelper from '../Helpers/PersistantHelper';

const UserDetails = () => {
  const [userName, setUserName] = useState('');

  const loggedInUser = async () => {
    userName = await PersistantHelper.getValue('userName');

    if (userName) {
      setUserName(userName);
    }
  };
  useEffect(() => {
    loggedInUser();
  });
  //   useEffect(async () => {
  //     const userName = await PersistantHelper.getValue('userName');

  //     if (userName) {
  //       setUserName(userName);
  //     }
  //   }, []);
  //     const keys = await PersistantHelper.getAllKeys();
  //   const keyValueArray= await Promise.all(
  //           keys .map(async key => {
  //             const value = await EncryptedStorage.getItem(key);
  //             return [key, value];
  //           }),
  //         );
  return (
    <View style={styles.container}>
      <Text>Welcome {userName}</Text>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

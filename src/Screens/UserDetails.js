import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PersistantHelper from '../Helpers/PersistantHelper';
import ApiHandler from '../Helpers/ApiHandler';
import {EventRegister} from 'react-native-event-listeners';

const UserDetails = () => {
  const [userName, setUserName] = useState('');
  const [myListData, setMyListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchListFromApi = () => {
    console.log('fetchListFromApi');
    setIsLoading(true);

    ApiHandler.get('/todos')
      .then(responsejson => {
        setMyListData(responsejson);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchListFromApi();
  }, []);

  const getUserName = async () => {
    const username = await PersistantHelper.getValue('userName');
    console.log('userDetails' + {username});
    setUserName(username);
  };

  useEffect(() => {
    getUserName();
    fetchListFromApi();
    // let event = EventRegister.addEventListener('userLoggedIn', data => {
    //   setIsUserLoggedIn(data.username ? true : false);
    // });

    // return () => {
    //   EventRegister.removeEventListener(event);
    // };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text>Welcome {userName}</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          //data={['a', 'b', 'c', 'd']}
          refreshing={isLoading}
          data={myListData}
          onRefresh={() => {
            console.log('myListData' + myListData);
            fetchListFromApi();
          }}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  height: 60,
                  marginHorizontal: 10,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}>
                <Text>{item.title}</Text>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          setUserName('');
          PersistantHelper.setValue('userName', userName);
          EventRegister.emit('userLoggedIn', false);
        }}>
        <Text style={styles.loginText}>LOG OUT</Text>
      </TouchableOpacity>
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
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
    flexDirection: 'flex-end',
  },
});

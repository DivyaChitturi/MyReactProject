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
import ApiHandler from '../Helpers/ApiHandler';

import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../Features/authSlice';

const UserDetails = () => {
  const dispatch = useDispatch();
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
    //const username = await PersistantHelper.getValue('userName');
    //setUserName(username);
  };

  useEffect(() => {
    getUserName();
    fetchListFromApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text>Welcome {userName}</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
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
          dispatch(signOut());
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

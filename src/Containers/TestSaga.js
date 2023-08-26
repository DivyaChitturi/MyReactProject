import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {itemsActions} from '../Features/itemSlice';
import {useDispatch} from 'react-redux';
import {userActions} from '../Features/userSlice';

const {onLogout} = userActions;
const {request, requestEvery, requestLatest} = itemsActions;

const TestSaga = props => {
  const dispatch = useDispatch();
  const [currLocale, setCurrLocale] = useState(undefined);
  const buttonstyle = {
    backgroundColor: 'blue',
    margin: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <View>
      <Text>sss</Text>
      <TouchableOpacity
        style={buttonstyle}
        onPress={() => {
          dispatch(
            request({url: 'https://jsonplaceholder.typicode.com/todos'}),
          );
        }}>
        <Text style={{color: 'white'}}>Take</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buttonstyle}
        onPress={() => {
          dispatch(
            requestEvery({url: 'https://jsonplaceholder.typicode.com/todos'}),
          );
        }}>
        <Text style={{color: 'white'}}>TAKE EVERY BEHAVIOR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buttonstyle}
        onPress={() => {
          dispatch(
            requestLatest({url: 'https://jsonplaceholder.typicode.com/todos'}),
          );
        }}>
        <Text style={{color: 'white'}}>TAKE LATEST BEHAVIOR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          dispatch(onLogout());
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default TestSaga;

import React, {createContext, useState, useContext} from 'react';
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
import {UserContext} from '../Contexts/UserContext';
import {EventRegister} from 'react-native-event-listeners';
const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const {setIsUserLoggedIn} = useContext(UserContext);
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          //setIsUserLoggedIn(true);
          PersistantHelper.setValue('userName', email);
          PersistantHelper.setValue('password', password);
          //PersistantHelper.setValue('isUserLoggedIn', true);
          //   props.navigation.navigate('UserDetails');
          EventRegister.emit('userName', {email});
          EventRegister.emit('password', {password});
          EventRegister.emit('userLoggedIn', {email});
        }}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});
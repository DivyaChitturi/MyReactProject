/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function App(): JSX.Element {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const image = {
    uri: 'https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg',
  };
  const HomeScreen = props => {
    return (
      <ImageBackground
        source={image}
        style={{
          flex: 1,
        }}>
        <View>
          <Text style={{margin: 5}}>User Name:</Text>
          <TextInput
            value={userName}
            onChangeText={text => {
              setUserName(text);
            }}
            style={{backgroundColor: 'white', height: 44, margin: 15}}
          />
          <Text style={{margin: 5}}>Password:</Text>
          <TextInput
            placeholder="Enter password"
            value={password}
            secureTextEntry={true}
            style={{backgroundColor: 'white', height: 44, margin: 15}}
          />
          <Button
            title="Submit"
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              props.navigation.navigate('Details', {
                userName: userName,
              });
            }}
          />
          <Button
            title="Reset"
            onPress={() => {
              setUserName('');
              setPassword('');
            }}
          />
        </View>
      </ImageBackground>
    );
  };

  const DetailScreen = props => {
    const {route} = props;
    // Alert.alert('userName' + userName);
    console.log(props);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Hi {JSON.stringify(route.params.userName)}</Text>
        <Button
          title="Go to Home"
          onPress={() => props.navigation.navigate('Home')}
        />
      </View>
    );
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren, PropsWithRef} from 'react';
import {ImageBackground, Text, View, TextInput, Button} from 'react-native';
import Modal from 'react-native-modal';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function App(): JSX.Element {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const image = {
    uri: 'https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg',
  };
  const HomeScreen = ({navigation}: any) => {
    //console.log('Hi');
    return (
      <ImageBackground
        source={image}
        style={{
          flex: 1,
        }}>
        <View>
          <Text>User Name:</Text>
          <TextInput
            value={userName}
            onChangeText={text => setUserName(text)}
            style={{backgroundColor: 'white', height: 44, margin: 15}}
          />
          <Text>Password:</Text>
          <TextInput
            placeholder="Enter password"
            value={password}
            secureTextEntry={true}
            style={{backgroundColor: 'white', height: 44, margin: 15}}
          />
          <Button
            title="Submit"
            // onPress={() => navigation.navigate('Details')}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate('Details', {
                itemId: 86,
                name: {userName},
              });
            }}
          />
        </View>
      </ImageBackground>
    );
  };

  const DetailScreen = ({navigation}: any) => {
    console.log({userName});
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Hi {userName}</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  };

  const Stack = createNativeStackNavigator();
  //console.log(HomeScreen);
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

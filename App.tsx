/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import LoginScreen from './src/Screens/LoginScreen';
import UserDetails from './src/Screens/UserDetails';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './store';
import ListScreen from './src/Screens/ListScreen';
import CartScreen from './src/Screens/CartScreen';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Nav = () => {
  const isULoggedIn = useSelector(state => state.Auth.isLoggedIn);
  console.log(isULoggedIn);

  const authStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Group>
    );
  };
  const mainStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{title: 'List'}}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{title: 'Cart'}}
        />
      </Stack.Group>
    );
  };

  return (
    <Stack.Navigator>{isULoggedIn ? mainStack() : authStack()}</Stack.Navigator>
  );
};
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Nav />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

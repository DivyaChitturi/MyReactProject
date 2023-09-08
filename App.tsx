/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import analytics from '@react-native-firebase/analytics';
import React, {useEffect, useState} from 'react';
import LoginScreen from './src/Screens/LoginScreen';
import UserDetails from './src/Screens/UserDetails';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './store';
import ListScreen from './src/Screens/ListScreen';
import CartScreen from './src/Screens/CartScreen';
import TestSaga from './src/Containers/TestSaga';
import FireStoreScreen from './src/Screens/FireStoreScreen';
import MapScreen from './src/Screens/MapScreen';
import {useSelector} from 'react-redux';
import NotificationHelper from './src/Helpers/NotificationHelper';
import UseMemoExample from './src/Screens/UseMemoExample';
import QRScan from './src/Screens/QRScan';

import {useNavigationContainerRef} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Nav = () => {
  //const isULoggedIn = useSelector(state => state.Auth.isLoggedIn);
  const navigation = useNavigation();

  const userData = useSelector(state => state.user);
  const isULoggedIn = typeof userData?.data?.id === 'string' ? true : false;

  // const user = useSelector(state => state.user);
  // const isULoggedIn =
  //   typeof user?.data?.id === 'string' && user?.data?.id.length > 20
  //     ? true
  //     : false;
  // console.log(isULoggedIn);

  const authStack = () => {
    return (
      <Stack.Group>
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
        <Stack.Screen name="QRScan" component={QRScan} />
      </Stack.Group>
    );
  };
  const mainStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="FireStoreScreen" component={FireStoreScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="TestSaga" component={TestSaga} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="UseMemoExample" component={UseMemoExample} />
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
  useEffect(() => {
    analytics().logEvent('testrun', {
      name: 'Divya',
    });
  });

  useEffect(() => {
    NotificationHelper.initializeFCM(
      recievedMessage => {
        if (recievedMessage.type === 'orderBooked') {
          //call order api
        }

        if (recievedMessage.type === 'newemail') {
          //call inbox api
        }
      },
      tappedMessage => {
        if (tappedMessage.type === 'news') {
          //navigate to so n so views with data
          // navigation.navigate('somescreenname');
        }
      },
    );
    NotificationHelper.checkFCMPermission();
    NotificationHelper.getToken();
    NotificationHelper.refreshToken();
  });
  const navigationRef = useNavigationContainerRef();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Nav />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

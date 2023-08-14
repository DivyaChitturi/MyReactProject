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
import {EventRegister} from 'react-native-event-listeners';
import PersistantHelper from './src/Helpers/PersistantHelper';
import {MyContextProvider} from './src/Contexts/UserContext';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const getUserName = async () => {
    const userName = await PersistantHelper.getValue('userName');
    console.log('UserName' + userName);
    setIsUserLoggedIn(userName ? true : false);
  };

  useEffect(() => {
    getUserName();

    let event = EventRegister.addEventListener('userLoggedIn', data => {
      setIsUserLoggedIn(data.email ? true : false);
      console.log('data.email' + data.email);
    });
    console.log('loggedInValue' + isUserLoggedIn);
    return () => {
      EventRegister.removeEventListener(event);
    };
  }, []);

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
      </Stack.Group>
    );
  };
  return (
    // <MyContextProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {isUserLoggedIn ? mainStack() : authStack()}
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="UserDetails" component={UserDetails} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    //   </MyContextProvider>
  );
}

export default App;

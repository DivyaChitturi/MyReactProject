/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import LoginScreen from './src/Screens/LoginScreen';
import UserDetails from './src/Screens/UserDetails';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  const isUserLoggedIn = false;

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
  console.log(isUserLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isUserLoggedIn ? mainStack() : authStack()}
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="UserDetails" component={UserDetails} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

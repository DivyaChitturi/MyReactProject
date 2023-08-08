/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import Cars from './src/Cars';
import CarDetails from './src/CarDetails';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DisplayCars">
        <Stack.Screen name="DisplayCars" component={Cars} />
        <Stack.Screen name="DisplayCarDetails" component={CarDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

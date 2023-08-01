/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';
import MyClassComponent from './src/MyClassComponent';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{}}>
      <MyClassComponent />
    </SafeAreaView>
  );
}

export default App;

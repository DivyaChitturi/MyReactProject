/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, Text} from 'react-native';
import MyClassComponent from './src/MyClassComponent';
import LayoutOne from './src/LayoutOne';
import LayoutTwo from './src/LayoutTwo';
import LayoutThree from './src/LayoutThree';

function App(): JSX.Element {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        // alignItems: 'flex-start',
      }}>
      <LayoutOne />
      <LayoutTwo />
      <LayoutThree />
      {/* {<MyClassComponent />} */}
    </SafeAreaView>
  );
}

export default App;

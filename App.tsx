/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

//import React from 'react';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';

const image = {
  uri: 'https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg',
};

const cityData = [
  {name: 'London'},
  {name: 'NY'},
  {name: 'Delhi'},
  {name: 'Sydney'},
  {name: 'Melbourne'},
  {name: 'Cairo'},
  {name: 'Istanbul'},
  {name: 'Karachi'},
];

function App(): JSX.Element {
  // const onTextInputValueChanged = changedText => {
  //   console.log(
  //     'this is a proof that we can pass functions using props from parent' +
  //       changedText,
  //   );
  // };

  const [textValue, setTextValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTextValue, setModalTextValue] = useState('');
  const [cityValues, setCityValues] = useState(cityData);

  console.log('hey this is app render');

  const renderFlatList = () => {
    return (
      <FlatList
        style={{margin: 10}}
        data={cityValues}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                backgroundColor: 'white',
                height: 50,
                borderBottomColor: 'black',
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                margin: 5,
              }}>
              <Text style={{marginHorizontal: 10}}>{item.name}</Text>
            </View>
          );
        }}
      />
    );
  };

  const renderModal = () => {
    return (
      <Modal
        isVisible={isModalVisible}
        hasBackdrop
        style={{height: 250}}
        onBackdropPress={() => {
          console.log('sdfsdf');
        }}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>
          <TextInput
            value={modalTextValue}
            onChangeText={changedText => {
              setModalTextValue(changedText);
            }}
            style={{backgroundColor: 'white', height: 44, margin: 5}}
          />

          <TouchableOpacity
            onPress={() => {
              setCityValues([...cityValues, {name: modalTextValue}]);
              setModalTextValue('');

              setIsModalVisible(false);
            }}
            style={{
              height: 44,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <ImageBackground
      source={image}
      style={{
        flex: 1,
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          //flexDirection: 'column',
        }}>
        {renderFlatList()}

        <TouchableOpacity
          style={{
            backgroundColor: 'yellow',
            margin: 10,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setIsModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        {renderModal()}
      </SafeAreaView>
    </ImageBackground>
  );
}

export default App;

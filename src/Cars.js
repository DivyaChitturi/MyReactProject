import React from 'react';
import {useState} from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  FlatList,
} from 'react-native';

const carsData = [
  {
    name: 'BMW',
    URL: '/Users/itc-consultant/Downloads/Pics/BMW.png',
    model: 'XYZ',
    year: '2020',
    color: 'Green',
  },
  {
    name: 'Benz',
    URL: '/Users/itc-consultant/Downloads/Pics/Benz.png',
    model: 'ABC',
    year: '2021',
    color: 'Red',
  },
];

const Cars = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [carName, setCarName] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carValues, setcarValues] = useState(carsData);

  const renderModal = () => {
    console.log(isModalVisible);
    return (
      <View style={styles.centeredView}>
        <Modal
          isVisible={isModalVisible}
          animationType="slide"
          //hasBackdrop
          style={{height: 250}}
          transparent={true}
          onBackdropPress={() => {}}>
          <View style={styles.modalView}>
            <Text>Car Name</Text>
            <TextInput
              value={carName}
              onChangeText={changedText => {
                setCarName(changedText);
              }}
              style={{backgroundColor: 'white', height: 44, margin: 5}}
            />
            <Text>Car Img URL</Text>
            <TextInput
              value={imgUrl}
              onChangeText={changedText => {
                setimgUrl(changedText);
              }}
              style={{backgroundColor: 'white', height: 44, margin: 5}}
            />
            <Text>Car Model</Text>
            <TextInput
              value={carModel}
              onChangeText={changedText => {
                setCarModel(changedText);
              }}
              style={{backgroundColor: 'white', height: 44, margin: 5}}
            />
            <Text>Car Year</Text>
            <TextInput
              value={carYear}
              onChangeText={changedText => {
                setCarYear(changedText);
              }}
              style={{backgroundColor: 'white', height: 44, margin: 5}}
            />
            <Text>Car Color</Text>
            <TextInput
              value={carColor}
              onChangeText={changedText => {
                setCarColor(changedText);
              }}
              style={{backgroundColor: 'white', height: 44, margin: 5}}
            />
            <Button
              title="Submit"
              onPress={() => {
                setcarValues([
                  ...carValues,
                  {
                    name: carName,
                    URL: imgUrl,
                    model: carModel,
                    year: carYear,
                    color: carColor,
                  },
                ]);
                setCarName('');
                setimgUrl('');
                setCarYear('');
                setCarModel('');
                setCarColor('');

                setIsModalVisible(false);
              }}
              style={{
                height: 44,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Submit</Text>
            </Button>
            <Button
              title="Cancel"
              onPress={() => {
                setCarName('');
                setimgUrl('');
                setCarYear('');
                setCarModel('');
                setCarColor('');
                setIsModalVisible(!isModalVisible);
              }}></Button>
          </View>
        </Modal>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Find your Cars Listing in Uk</Text>
      <Button
        title="Add Car"
        onPress={() => {
          setIsModalVisible(true);
        }}
      />
      {renderModal()}
      <FlatList
        data={carValues}
        renderItem={({item, index}) => {
          return (
            <View style={styles.container}>
              <Image source={{uri: item.URL}} style={styles.image} />
              <Text style={styles.text}>Name: {item.name}</Text>
              <TouchableOpacity style={styles.button}>
                <Text
                  style={styles.buttonText}
                  onPress={() => {
                    props.navigation.navigate('DisplayCarDetails', {
                      carName: item.name,
                      carImage: item.URL,
                      carModel: item.model,
                      carColor: item.color,
                    });
                  }}>
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Cars;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    transparent: true,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#121212',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    width: 80,
    marginTop: 10,
    padding: 6,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
  },
  headerFooterStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#606070',
  },
});

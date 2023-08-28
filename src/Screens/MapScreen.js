import {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapControl from '../Controls/MapControl';

const MapScreen = () => {
  const mapRef = useRef(null);

  const parentControlMapRef = useRef(null);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>maps</Text>
        <MapControl ref={parentControlMapRef} style={{flex: 1}} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              parentControlMapRef.current.animateToCustomLocation({
                latitude: 37.3346437,
                longitude: -122.0138429,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
            }}
            style={{
              position: 'absolute',
              left: 10,
              right: 10,
              bottom: 20,
              backgroundColor: 'green',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              width: 98,
              height: 98,
              margin: 4,
              //alignSelf: 'flex-end',
            }}>
            <Text>Apple HeadQuarters</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              parentControlMapRef.current.animateToCustomLocation({
                latitude: 51.5260337,
                longitude: -0.0880577,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
            }}
            style={{
              position: 'absolute',
              left: 10,
              right: 10,
              bottom: 20,
              backgroundColor: 'yellow',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              width: 98,
              height: 98,
              margin: 4,
              //alignSelf: 'flex-center',
            }}>
            <Text>ITC Office</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              //27.1751495,78.0395619
              parentControlMapRef.current.animateToCustomLocation({
                latitude: 27.1751495,
                longitude: 78.0395619,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
            }}
            style={{
              position: 'absolute',
              left: 10,
              right: 10,
              bottom: 20,
              backgroundColor: 'pink',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              width: 98,
              height: 98,
              margin: 4,
              //alignSelf: 'flex-end',
            }}>
            <Text>TajMahal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

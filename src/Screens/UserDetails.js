import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Pressable,
} from 'react-native';
import styles from '../../styles';
import Svg, {Image, Ellipse, ClipPath} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../Features/authSlice';

const UserDetails = () => {
  const dispatch = useDispatch();
  const {height, width} = Dimensions.get('window');
  const [userName, setUserName] = useState('');
  const [myListData, setMyListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserName = async () => {
    //const username = await PersistantHelper.getValue('userName');
    //setUserName(username);
  };

  useEffect(() => {
    //getUserName();
    //fetchListFromApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFill]}>
        <Svg height={height} width={width}>
          <Image
            href={require('/Users/itc-consultant/Documents/GitHub/ReactNative_Projects/MyReactProject/Assets/Images/woman-calculating-bills.jpg')}
            width={width + 5}
            height={height + 5}
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
        <View style={styles.container}>
          <View>
            <Text style={styles.buttonText}>LOG IN</Text>
          </View>
        </View>
      </View>
      <Text style={styles.buttonText}>LOG IN</Text>
    </View>
  );
};

export default UserDetails;

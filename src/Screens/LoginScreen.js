import React, {useState, useEffect} from 'react';

import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Pressable,
} from 'react-native';
import {signIn} from '../Features/authSlice';
import styles from '../../styles';
import Svg, {Image, Ellipse, ClipPath} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import {userActions} from '../Features/userSlice';
import {kApiSignup} from '../Config/Constants';
import {useSelector} from 'react-redux';

const {request, clear} = userActions;

const Login = props => {
  const dispatch = useDispatch();
  const {height, width} = Dimensions.get('window');
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(clear());
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0],
    );
    return {
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });
  console.log('Login');
  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, {duration: 500}),
      transform: [{translateY: withTiming(interpolation, {diration: 1000})}],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 800}),
      transform: [
        {rotate: withTiming(interpolation + 'deg', {duration: 1000})},
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, {duration: 800}))
          : withTiming(0, {duration: 300}),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {transform: [{scale: formButtonScale.value}]};
  });
  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      //setIsRegistering(false);
      runOnJS(setIsRegistering)(false);
    }
  };
  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      //setIsRegistering(true);
      runOnJS(setIsRegistering)(true);
    }
  };
  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height} />
          </ClipPath>
          <Image
            href={require('/Users/itc-consultant/Documents/GitHub/ReactNative_Projects/AwesomeProject/Assets/Images/HomeImage.jpeg')}
            width={width + 5}
            height={height + 5}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View
          style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
          <Text onPress={() => (imagePosition.value = 1)}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={email => setEmail(email)}
          />
          {isRegistering && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="black"
              style={styles.textInput}
              onChangeText={userName => setUserName(userName)}
            />
          )}

          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={password => setPassword(password)}
          />
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            {isRegistering ? (
              <Pressable
                onPress={() => {
                  dispatch(
                    request({
                      url: kApiSignup,
                      data: {userName, email, password},
                    }),
                  );
                }}>
                <Text style={styles.buttonText}>REGISTER</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                      console.log('User account created & signed in!');
                      dispatch(signIn(true));
                      // Alert('Login');
                    })
                    .catch(error => {
                      if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                      }
                      if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                      }
                      console.error(error);
                    });
                }}>
                <Text style={styles.buttonText}>LOG IN</Text>
              </Pressable>
            )}
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default Login;

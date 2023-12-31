import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  NativeModules,
} from 'react-native';
import {kApiSignup, kApiLogin} from '../Config/Constants';
import {userActions} from '../Features/userSlice';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import notifee, {AndroidImportance} from '@notifee/react-native';

const {request, clear} = userActions;

const LoginScreen = props => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const {CalendarModule} = NativeModules;

  async function createNotification() {
    try {
      const channelId = 'custom_channel_id';

      // Create a channel (if it doesn't exist)
      await notifee.createChannel({
        id: channelId,
        name: 'Custom Channel',
        vibration: true,
      });

      // Create a notification with the custom channel ID
      const notification = {
        title: 'My Custom Notification',
        body: 'This notification uses a custom channel ID.',
        android: {
          channelId: channelId, // Assign the custom channel ID
        },
      };

      // Display the notification
      await notifee.displayNotification(notification);
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  useEffect(() => {
    dispatch(clear());
  }, []);

  const showAlert = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={require('/Users/itc-consultant/Documents/GitHub/ReactNative_Projects/MyReactProject/Assets/Images/HomeImage.jpeg')}
      />
      {/* <Image
        style={styles.bgImage}
        source={{
          uri: '/Users/itc-consultant/Documents/GitHub/ReactNative_Projects/MyReactProject/Assets/Images/HomeImage.jpeg',
        }}
      /> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="userName"
          value={userName}
          underlineColorAndroid="transparent"
          onChangeText={text => setUserName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={text => setEmail(text)}
        />
        <Image
          style={styles.inputIcon}
          source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => setPassword(text)}
        />
        <Image
          style={styles.inputIcon}
          source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
        />
      </View>

      <TouchableOpacity
        style={styles.btnForgotPassword}
        onPress={() => showAlert('restore_password')}>
        <Text style={styles.btnText}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() =>
          dispatch(request({url: kApiLogin, data: {email, password}}))
        }>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          dispatch(
            request({url: kApiSignup, data: {userName, email, password}}),
          )
        }>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.fabookButton]}
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!'),
          )
        }>
        <View style={styles.socialButtonContent}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://img.icons8.com/color/70/000000/facebook.png',
            }}
          />
          <Text style={styles.loginText}>Continue with facebook</Text>
        </View>
      </TouchableOpacity>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Create Notification"
          onPress={() => {
            try {
              notifee.requestPermission();
              const channelId = 'notifee_channel_id';

              // Create a channel (if it doesn't exist)
              notifee.createChannel({
                id: channelId,
                name: 'Divya',
                vibration: true,
              });

              // Create a notification with the custom channel ID
              const notification = {
                title: 'Divy Notification',
                body: 'This notification uses a Divya channel ID.',
                android: {
                  channelId: channelId, // Assign the custom channel ID
                },
              };

              // Display the notification
              notifee.displayNotification(notification);
            } catch (error) {
              console.error('Error creating notification:', error);
            }
          }}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Create Calender Event"
          onPress={() => {
            CalendarModule.createCalendarEvent(
              'lets see the CalenderEvent!!',
              'UK',
            );
          }}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.googleButton]}
        onPress={() => {
          //dispatch(request({url: kApiLogin, data: {email, password}}));
          auth()
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => {
              dispatch(signIn(true));
            })
            .catch(error => {
              var errorCode = error.code;
              var errorMessage = error.message;
            });
        }}>
        <View style={styles.socialButtonContent}>
          <Image
            style={styles.icon}
            source={{uri: 'https://img.icons8.com/color/70/000000/youtube.png'}}
          />
          <Text style={styles.loginText}>Sign in with google</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => {
          CalendarModule.createCalendarEvent('CalenderNativeModule', 'UK');
        }}>
        <Text>test native</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#00b5ec',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  restoreButtonContainer: {
    width: 250,
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  socialButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    color: '#FFFFFF',
    marginRight: 5,
  },
  fabookButton: {
    backgroundColor: '#3b5998',
  },
  googleButton: {
    backgroundColor: '#ff0000',
  },
});

export default LoginScreen;

import messaging from '@react-native-firebase/messaging';

class NotificationHelper {
  getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log('here is token');
        console.log(token);
      });
  };

  refreshToken = () => {
    messaging().onTokenRefresh(token => {
      console.log('here is refreshed token');
      console.log(token);
    });
  };

  initializeFCM = (onRecieve, onTap) => {
    this.messageListener = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);

      //external callback if any
      if (onRecieve) {
        onRecieve(remoteMessage);
      }
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(remoteMessage);

      //external callback if any
      if (onTap) {
        onTap(remoteMessage);
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(remoteMessage);
    });

    messaging()
      .subscribeToTopic('ITCPeople')
      .then(() => {
        console.log('subscribed to topic');
      })
      .catch(err => {
        console.log(err);
      });
  };

  checkFCMPermission = async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  getInitialNotification = () => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(remoteMessage);
      });
  };

  unMount = () => {
    this.messageListener();
  };
}

export default new NotificationHelper();

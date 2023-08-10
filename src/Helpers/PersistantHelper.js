import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

class PersistantHelper {
  setValue = async (key, value) => {
    // try {
    //   await AsyncStorage.setItem(key, value);

    //   console.log('Saved successfully');
    // } catch (e) {
    //   // saving error
    //   console.log('write error: ' + e);
    // }

    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          age: 21,
          token: 'ACCESS_TOKEN',
          username: 'emeraldsanto',
          languages: ['fr', 'en', 'de'],
        }),
      );
      console.log('Saved successfully');
      // Congrats! You've just stored your first value!
    } catch (error) {
      console.log('Error' + error);
      // There was an error on the native side
    }
  };

  getValue = async key => {
    // try {
    //   const value = await AsyncStorage.getItem(key);
    //   if (value !== null) {
    //     console.log('Values Received');

    //     return value;
    //   }
    // } catch (e) {
    //   // error reading value
    // }
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session !== undefined) {
        console.log('Receieved successfully');
        // Congrats! You've just retrieved your first value!
      }
    } catch (error) {
      // There was an error on the native side
    }
  };
}

export default new PersistantHelper();

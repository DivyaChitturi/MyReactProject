import {View} from 'react-native';
import LayoutTwo from './LayoutTwo';
import LayoutThree from './LayoutThree';

const LayoutOne = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#00ffff',
        margin: 50,
        height: 100,
        width: 100,
        alignSelf: 'flex-start',
      }}></View>
  );
};

export default LayoutOne;

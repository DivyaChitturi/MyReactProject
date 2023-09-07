import React from 'react';
import {View, Text} from 'react-native';

const DisplayCount = props => {
  console.log('displayCount');
  return (
    <View>
      <Text>Count:</Text>
    </View>
  );
};

//export default DisplayCount;
export default React.memo(DisplayCount);

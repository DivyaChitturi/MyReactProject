import React, {useEffect, useState} from 'react';
import DisplayCount from './DisplayCount';
import {View, Text, Button} from 'react-native';

const UseMemoExample = props => {
  const [count, setCount] = useState(0);

  const IncrementFunc = () => {
    setCount(count => count + 1);
  };

  return (
    <View>
      <DisplayCount />
      <Text>{count}</Text>
      <Button title="Press Me Button" onPress={IncrementFunc}></Button>
    </View>
  );
};
export default UseMemoExample;

import React from 'react';
import {TextInput, View, Button, Text} from 'react-native';

class MyClassComponent extends React.Component {
  state = {
    presscount: 0,
    input: 'state',
  };

  IncrementFunc = () => {
    this.setState(prevState => ({
      presscount: prevState.presscount + 1,
    }));
  };

  handleChange = text => {
    this.setState({
      input: TextInput,
    });
  };

  render() {
    return (
      <View>
        <Text>Press Count {this.state.presscount}</Text>
        <Text />
        <Button title="Press Me Button" onPress={this.IncrementFunc}>
          Button press count: {this.presscount}
        </Button>
      </View>
    );
  }
}

export default MyClassComponent;

import {View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

class LayoutOne extends React.PureComponent {
  render() {
    const {bgColor} = this.props;

    console.log('hey this is level one render');

    return (
      <View
        style={{
          width: 120,
          height: 180,
          backgroundColor: bgColor,
          margin: 5,
          flexDirection: 'column',
        }}></View>
    );
  }
}

export default LayoutOne;

LayoutOne.propTypes = {
  bgColor: PropTypes.string.isRequired,
};

LayoutOne.defaultProps = {
  bgColor: 'yellow',
};

import React from 'react';
import { View, Text } from 'react-native'
import { Toast } from 'native-base'

export class ErrorFlash extends React.Component {
  componentWillMount() {
    const errors = this.props.errors.join(' ');
    Toast.show({
      text: errors
    });
  }

  render() {
    return (
      <View />
    )
  }
}

export class InfoFlash extends React.Component {
  componentWillMount() {
    Toast.show({
      text: this.props.info
    });
  }

  render() {
    return (
      <View />
    )
  }
}

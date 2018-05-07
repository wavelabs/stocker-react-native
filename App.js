import { View } from 'react-native';
import React, { Component } from 'react';
import { Font } from 'expo';

import { Provider } from 'react-redux';

import App from './src/App';

import store from './src/store';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      )
    } else {
      return null
    }
  }
}

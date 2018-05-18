import React, { Component } from 'react';
import { NativeModules, StatusBar } from 'react-native';

import MainTabNavigator from '../routes';

import { Root } from 'native-base';

const UIManager = NativeModules.UIManager;

class App extends Component {
    componentWillMount() {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    render() {
      return (
        <Root>
          <StatusBar />
          <MainTabNavigator ref={(nav) => { this.navigator = nav; }}/>
        </Root>
      );
    }
}

export default App;

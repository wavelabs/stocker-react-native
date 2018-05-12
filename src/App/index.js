import React, { Component } from 'react';
import { NativeModules, StatusBar, View } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import MainTabNavigator from '../routes';

import { Root } from 'native-base';

const UIManager = NativeModules.UIManager;

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
        accentColor: COLOR.pink500,
    },
};

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

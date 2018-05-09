import React, { Component } from 'react';
import { NativeModules, StatusBar, View } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import MainTabNavigator from '../routes';

import { SafeAreaView } from 'react-navigation';

import { Root, Container, Drawer } from 'native-base';

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

    closeDrawer() {
      window.drawer._root.close()
    }

    render() {
      return (
        <ThemeProvider uiTheme={uiTheme}>
          <Root>
            <MainTabNavigator ref={(nav) => { this.navigator = nav; }}/>
          </Root>
        </ThemeProvider>
      );
    }
}

export default App;

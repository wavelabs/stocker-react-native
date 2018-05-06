import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Container from '../Container'
import { Button, Toolbar, BottomNavigation } from 'react-native-material-ui';

export default class AddProductScreen extends React.Component {
  constructor(props) {
    super(props);
    //const { params } = this.props.navigation.state;
    const params = { data: '123128312' }
    this.state = { name: '', code: params.data, amount: 1 };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Toolbar
            key="toolbar"
            leftElement="arrow-back"
            onLeftElementPress={() => this.props.navigation.goBack()}
            centerElement="Agregar Producto"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Nombre del Producto"
          onChangeText={(text) => this.setState({name})}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Código"
          value={this.state.code}
          onChangeText={(code) => this.setState({code})}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Cantidad"
          value={this.state.amount.toString()}
          onChangeText={(amount) => this.setState({amount})}
        />
        <View style={styles.button}>
          <Button text='Agregar Producto' raised primary />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 20
  },
  lightLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginLeft: 5,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  decoratorLine: {
    backgroundColor: '#00bcd4',
    height: 2,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    height: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

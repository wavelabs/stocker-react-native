import React from 'react';
import { View, ScrollView } from 'react-native';
import { ThemeProvider, ActionButton, ListItem, Toolbar } from 'react-native-material-ui';
import Container from '../Container';

export default class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    const data = [
      {id: 1, name: 'Chorizo', stock: '1'},
      {id: 1, name: 'Vacio', stock: '10'},
      {id: 1, name: 'Picana', stock: '10'},
      {id: 1, name: 'Choquizuela', stock: '10'},
      {id: 1, name: 'Morcilla', stock: '10'},
      {id: 1, name: 'Tapa de Asado', stock: '10'},
      {id: 1, name: 'Costilla', stock: '10'},
      {id: 1, name: 'Cerveza', stock: '10'},
      {id: 1, name: 'Vino', stock: '10'},
      {id: 1, name: 'Coca Cola', stock: '10'},
      {id: 1, name: 'Fernet', stock: '10'},
      {id: 1, name: 'Agua', stock: '10'}
    ];

    return (
      <Container>
        <ScrollView>
          <Toolbar
              key="toolbar"
              leftElement="menu"
              centerElement="Stocker"
              searchable={{
                  autoFocus: true,
                  placeholder: 'Search'
              }}
          />
          {data.map((product) => <ListItem
              divider
              centerElement={{primaryText: product.name}}
              onPress={() => alert('Stock:' + product.stock)}
              key={product.id}
            />)}
        </ScrollView>
        <ActionButton
          icon="camera"
          onPress={() => {this.props.navigation.navigate('ScanBarCode')}}
      />
      </Container>
    )
  }
}

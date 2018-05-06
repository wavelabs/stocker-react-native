import React from 'react';
import { ListView, ScrollView, View } from 'react-native';
import { ActionButton, Subheader } from 'react-native-material-ui';
import { Text, Button, Container, Form, Item, Input, List, ListItem, Body, Right, Icon } from 'native-base'
import ScanBarCodeModal from '../ScanBarCodeModal'
import styles from './styles'

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barCodeRead: '',
      quantity: 1,
      isBarCodeRead: false
    };
    this.onSubmit      = this.onSubmit.bind(this);
    this.onChange      = this.onChange.bind(this);
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.openBarCodeScanner = this.openBarCodeScanner.bind(this);
  }

  onChange(attributes) {
    this.setState(attributes);
  }

  onBarCodeRead(data) {
    this.setState({
      isBarCodeRead: false,
      barCodeRead:  data.data,
      quantity:    1
    });
  }

  openBarCodeScanner() {
    this.setState({isBarCodeRead: true})
  }

  onSubmit() {
    this.props.onSubmit(this.state.barCodeRead, this.state.quantity);
    this.setState({barCodeRead: '', quantity: 1});
  }

  render() {
    const barcode = this.state.barCodeRead;
    const quantity = this.state.quantity;

    return (
      <Container>
        <View>
          <Subheader text="Agregar Item" />
        </View>
        <Form>
          <Item>
            <Input
              placeholder="Código"
              value={barcode}
              onChangeText={text => this.onChange({barCodeRead: text})}
              />
          </Item>
          <Item>
            <Input
              placeholder="Cantidad"
              keyboardType='numeric'
              value={quantity.toString()}
              onChangeText={text => this.onChange({quantity: text})}
              />
          </Item>
          <Button full info onPress={this.onSubmit}>
            <Text>Agregar</Text>
          </Button>
        </Form>
      </Container>
    )
  }
}

export default InvoiceForm;

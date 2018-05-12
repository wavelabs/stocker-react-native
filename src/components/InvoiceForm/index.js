import React from 'react';
import { ListView, ScrollView, View } from 'react-native';
import { H3, Label, Form, Item, Input, List, ListItem, Body, Right, Icon } from 'native-base'
import ScanBarCodeModal from '../ScanBarCodeModal'
import styles from './styles'

class InvoiceForm extends React.Component {
  render() {
    const quantity = this.props.quantity;

    return (
      <Form
        styles={{flex: 1}}
      >
        <Item floatingLabel >
          <Label>Cantidad</Label>
          <Input
            keyboardType='numeric'
            value={quantity.toString()}
            onChangeText={text => this.props.onQuantityChange(text)}
            />
        </Item>
      </Form>
    )
  }
}

export default InvoiceForm;

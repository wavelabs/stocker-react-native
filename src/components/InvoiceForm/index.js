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
      isBarCodeRead: false,
      created_at: Date.now(),
      invoice_lines_attributes: [
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22},
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22},
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22},
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22},
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22},
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22},
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22},
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22},
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22},
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22},
        {name: 'probando', quantity: '1', price: 23.22, subtotal: 23.22}
      ],
      total: 255.42
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.onChange      = this.onChange.bind(this);
    this.onSubmit      = this.onSubmit.bind(this);
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.openBarCodeScanner = this.openBarCodeScanner.bind(this);
    this.addLineItem = this.addLineItem.bind(this);
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

  findProductByBarcode(barcode, callback) {
    fetch('http://192.168.1.2:3000/products?barcode=' + barcode)
      .then(res => res.json())
      .then(callback)
  }

  addLineItem(e) {
    this.findProductByBarcode(this.state.barCodeRead, (data) => {
      const {name, id, price} = data[0];
      const subtotal = this.state.quantity * price;
      const invoiceLineItem = {
        quantity: this.state.quantity,
        name: name,
        product_id: id,
        price: price,
        subtotal: subtotal
      };

      this.setState({
        invoice_lines_attributes: [...this.state.invoice_lines_attributes, invoiceLineItem],
        quantity: 1,
        barCodeRead: '',
        total: this.state.total + subtotal
      });
    })
  }

  openBarCodeScanner() {
    this.setState({isBarCodeRead: true})
  }

  onSubmit() {
    const invoice = {
      created_at: this.state.created_at,
      invoice_lines_attributes: this.state.invoice_lines_attributes
    };

    fetch('http://192.168.1.2:3000/invoices', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(invoice)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.invoice_lines_attributes];
    const removedItems = newData.splice(rowId, 1);
    const newTotal = this.state.total - removedItems[0].subtotal;
    this.setState({ invoice_lines_attributes: newData, total: newTotal });
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      <Container>
        <View>
          <Subheader text="Agregar Item" />
        </View>
        <Form>
          <Item>
            <Input
              placeholder="Código"
              value={this.state.barCodeRead}
              onChangeText={text => this.onChange({barCodeRead: text})}
              />
          </Item>
          <Item>
            <Input
              placeholder="Cantidad"
              keyboardType='numeric'
              value={this.state.quantity.toString()}
              onChangeText={text => this.onChange({quantity: text})}
              />
          </Item>
          <Button full info onPress={this.addLineItem}>
            <Text>Agregar</Text>
          </Button>
        </Form>
        <View>
          <Subheader text="Items" />
        </View>
        <ScrollView>
          <List
            disableRightSwipe={true}
            dataSource={this.ds.cloneWithRows(this.state.invoice_lines_attributes)}
            renderRow={data =>
              <ListItem>
                <Body>
                  <Text>{data.name}</Text>
                  <Text note>{`$${data.price} x ${data.quantity}`}</Text>
                </Body>
                <Right>
                  <Text>$ {data.subtotal}</Text>
                </Right>
              </ListItem>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
            rightOpenValue={-75}
          />
        </ScrollView>
        <ActionButton
          styles={styles.actionButton}
          icon='camera'
          onPress={this.openBarCodeScanner}
        />
        <View>
          <Subheader text={`Total: $${this.state.total}`} />
        </View>
        <View>
          <Button full success onPress={this.onSubmit}>
            <Text>Guardar</Text>
          </Button>
        </View>
        <ScanBarCodeModal
          visible={this.state.isBarCodeRead}
          onBarCodeRead={this.onBarCodeRead}
        />
      </Container>
    )
  }
}

export default InvoiceForm;

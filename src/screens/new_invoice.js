import React from 'react';
import { View } from 'react-native';
import { ActionButton, Subheader } from 'react-native-material-ui';
import { Container, Button, Icon, Text, Fab } from 'native-base';
import InvoiceForm from '../components/InvoiceForm';
import NewInvoiceHeader from '../components/NewInvoiceHeader'
import NewInvoiceListLineItems from '../components/NewInvoiceListLineItems'
import ScanBarCodeModal from '../components/ScanBarCodeModal'

export default class NewInvoiceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: {
        total: 0,
        invoice_lines_attributes: [],
        created_at: Date.now()
      },
      barCodeRead: '',
      isBarCodeRead: false,
      isBulkInput: false
    };
    this.onSubmit               = this.onSubmit.bind(this);
    this.onLineItemFormSubmit   = this.onLineItemFormSubmit.bind(this);
    this.onDeleteLineItem       = this.onDeleteLineItem.bind(this);
    this.openBarCodeScanner     = this.openBarCodeScanner.bind(this);
    this.onBarCodeRead          = this.onBarCodeRead.bind(this);
    this.closeBarCodeRead       = this.closeBarCodeRead.bind(this);
  }

  findProductByBarcode(barcode, callback) {
    fetch('http://192.168.1.2:3000/products?barcode=' + barcode)
      .then(res => res.json())
      .then(callback)
  }

  onLineItemFormSubmit(barcode, quantity) {
    this.findProductByBarcode(barcode, (data) => {
      const {name, id, price} = data[0];
      const subtotal = quantity * price;
      const invoiceLineItem = {
        quantity: quantity,
        name: name,
        product_id: id,
        price: price,
        subtotal: subtotal
      };

      const invoice = {
        ...this.state.invoice,
        total: this.state.invoice.total + subtotal,
        invoice_lines_attributes: [...this.state.invoice.invoice_lines_attributes, invoiceLineItem]
      }

      this.setState({invoice: invoice, barCodeRead: ''});
    })
  }

  onSubmit() {
    fetch('http://192.168.1.2:3000/invoices', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(this.state.invoice)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  onDeleteLineItem(newLineItems, deletedItems) {
    const invoice = {
      ...this.state.invoice,
      total: this.state.invoice.total - deletedItems.reduce((sum, item) => (sum + item.subtotal), 0),
      invoice_lines_attributes: newLineItems
    };

    this.setState({invoice: invoice});
  }

  openBarCodeScanner() {
    this.setState({isBarCodeRead: true});
  }

  closeBarCodeRead() {
    this.setState({isBarCodeRead: false});
  }

  onBarCodeRead(data) {
    this.onLineItemFormSubmit(data.data, 1);
    this.setState({isBarCodeRead: false});
  }

  render() {
    const navigation = this.props.navigation;
    const {total, invoice_lines_attributes} = this.state.invoice;

    return (
      <Container>
        <NewInvoiceHeader
          navigation={navigation}/>
          { (this.state.isBulkInput) ?
            <InvoiceForm
              barCodeRead={this.state.barCodeRead}
              onSubmit={this.onLineItemFormSubmit}/>
            : null }
          <NewInvoiceListLineItems
            items={invoice_lines_attributes}
            onDelete={this.onDeleteLineItem}/>
          <View>
            <Subheader text={`Total: $${total}`} />
          </View>
          <View>
            <Button full success onPress={this.onSubmit}>
              <Text>Guardar</Text>
            </Button>
          </View>
          <Fab
            active={false}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={this.openBarCodeScanner}>
            <Icon name="camera" />
          </Fab>
          <ScanBarCodeModal
            visible={this.state.isBarCodeRead}
            onBarCodeRead={this.onBarCodeRead}
            onClose={this.closeBarCodeRead}
          />
      </Container>
    )
  }
}

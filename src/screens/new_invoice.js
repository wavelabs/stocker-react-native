import React from 'react';
import { View, Vibration } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ActionButton, Subheader } from 'react-native-material-ui';
import { Container, Button, Icon, Text, Fab, Toast } from 'native-base';
import InvoiceForm from '../components/InvoiceForm';
import NewInvoiceHeader from '../components/NewInvoiceHeader'
import NewInvoiceListLineItems from '../components/NewInvoiceListLineItems'
import ScanBarCodeModal from '../components/ScanBarCodeModal'

import { ErrorFlash } from '../components/StockerFlash';

import { connect } from 'react-redux';
import { addLineItem, removeLineItem, createInvoice } from '../actions/invoiceActions';

class NewInvoiceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barCodeRead: '',
      isBarCodeRead: false,
      isBulkInput: false,
      showToast: false
    };
    this.onSubmit               = this.onSubmit.bind(this);
    this.onLineItemFormSubmit   = this.onLineItemFormSubmit.bind(this);
    this.onDeleteLineItem       = this.onDeleteLineItem.bind(this);
    this.openBarCodeScanner     = this.openBarCodeScanner.bind(this);
    this.onBarCodeRead          = this.onBarCodeRead.bind(this);
    this.closeBarCodeRead       = this.closeBarCodeRead.bind(this);
  }

  onSubmit() {
    this.props.createInvoice(this.props.invoice);
  }

  onLineItemFormSubmit() {

  }

  onDeleteLineItem(newLineItems, deletedItems) {
    this.props.removeLineItem(newLineItems, deletedItems);
  }

  openBarCodeScanner() {
    this.setState({isBarCodeRead: true});
  }

  closeBarCodeRead() {
    this.setState({isBarCodeRead: false});
  }

  onBarCodeRead(data) {
    this.props.addLineItem(data.data, 1);
    this.closeBarCodeRead();
  }

  render() {
    const navigation = this.props.navigation;
    const {total, invoice_lines_attributes} = this.props.invoice;

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
          <SafeAreaView style={{backgroundColor: '#5FB760'}}>
            <Button full success onPress={this.onSubmit}>
              <Text>Guardar</Text>
            </Button>
          </SafeAreaView>
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
          { this.props.errors.length ? <ErrorFlash
            errors={this.props.errors} /> : null }
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  invoice:  state.invoices.item,
  products: state.products.items,
  errors:   state.screens.errors
});

export default connect(
  mapStateToProps, {
    createInvoice,
    addLineItem,
    addLineItem,
    removeLineItem
  })(NewInvoiceScreen);

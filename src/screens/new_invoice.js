import React from 'react';
import { View, Vibration, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Footer, FooterTab, H3, Container, Button, Icon, Text, Fab, Toast } from 'native-base';
import InvoiceForm from '../components/InvoiceForm';
import StockerHeader from '../components/StockerHeader'
import NewInvoiceListLineItems from '../components/NewInvoiceListLineItems'
import ScanBarCodeModal from '../components/ScanBarCodeModal'
import ProductSearchModal from '../components/ProductSearchModal'

import { connect } from 'react-redux';
import { addLineItem, createInvoice } from '../actions/invoiceActions';

class NewInvoiceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barCodeRead: '',
      showToast: false,
      quantity: 1,
      isReadingBarcode: false,
      isSearchingProducts: false
    };
    this.onSubmit                  = this.onSubmit.bind(this);
    this.openBarCodeScanner        = this.openBarCodeScanner.bind(this);
    this.openProductSearchModal    = this.openProductSearchModal.bind(this);
    this.closeProductSearchModal   = this.closeProductSearchModal.bind(this);
    this.onBarCodeRead             = this.onBarCodeRead.bind(this);
    this.closeBarCodeRead          = this.closeBarCodeRead.bind(this);
    this.onQuantityChange          = this.onQuantityChange.bind(this);
    this.onProductSelected         = this.onProductSelected.bind(this);
  }

  onSubmit() {
    this.props.createInvoice(this.props.invoice)
  }

  openBarCodeScanner() {
    this.setState({isReadingBarcode: true});
  }

  openProductSearchModal() {
    this.setState({isSearchingProducts: true});
  }

  closeProductSearchModal() {
    this.setState({isSearchingProducts: false});
  }

  closeBarCodeRead() {
    this.setState({isReadingBarcode: false});
  }

  onBarCodeRead(data) {
    this.props.addLineItem(data.data, this.state.quantity);
    this.closeBarCodeRead();
    this.setState({quantity: 1});
  }

  onQuantityChange(text) {
    this.setState({quantity: text});
  }

  onProductSelected(product) {
    this.props.addLineItem(product.barcode, this.state.quantity);
    this.closeProductSearchModal();
  }


  render() {
    const navigation = this.props.navigation;
    const {total, invoice_lines_attributes} = this.props.invoice;

    return (
      <Container>
        <StockerHeader
          back
          navigation={navigation}
          title={"Nueva Venta"}
        />
        <InvoiceForm
          quantity={this.state.quantity}
          onQuantityChange={this.onQuantityChange}
          style={styles.invoiceForm}
        />
        <NewInvoiceListLineItems
          items={invoice_lines_attributes}
          onDelete={this.onDeleteLineItem}
          styles={styles.invoiceLineItems}
        />
        <View styles={styles.subHeader}>
          <H3>{`Total: $${total}`}</H3>
        </View>
        <Footer styles={styles.footer}>
          <FooterTab>
            <Button
              onPress={this.openProductSearchModal}>
              <Icon name="search"/>
              <Text>Buscar</Text>
            </Button>
            <Button
              active
              onPress={this.onSubmit}
            >
              <Text>Guardar</Text>
            </Button>
            <Button
              onPress={() => this.setState({isReadingBarcode: true})}
            >
              <Icon name="barcode"/>
              <Text>Escanear</Text>
            </Button>
          </FooterTab>
        </Footer>
        <ScanBarCodeModal
          visible={this.state.isReadingBarcode}
          onBarCodeRead={this.onBarCodeRead}
          handlePressCancel={this.closeBarCodeRead}
        />
        <ProductSearchModal
          visible={this.state.isSearchingProducts}
          onButtonClosePress={this.closeProductSearchModal}
          onProductSelected={this.onProductSelected}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  invoiceForm: { flex: 1 },
  footer: { flex: 1 },
  invoiceLineItems: { flex: 2 },
  subHeader: { flex: 1 }
});

const mapStateToProps = state => ({
  invoice:  state.invoices.item,
  products: state.products.items,
  errors:   state.ui.errors
});

export default connect(
  mapStateToProps, {
    createInvoice,
    addLineItem
  })(NewInvoiceScreen);

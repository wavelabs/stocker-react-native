import React from 'react';
import { View, Vibration } from 'react-native';
import { H3, Container, Button, Icon, Text, Fab, Toast } from 'native-base';
import ProductForm from '../components/ProductForm';
import NewProductHeader from '../components/NewProductHeader'
import NewInvoiceListLineItems from '../components/NewInvoiceListLineItems'
import ScanBarCodeModal from '../components/ScanBarCodeModal'
import StockerHeader from '../components/StockerHeader'

import { connect } from 'react-redux';
import { changeProductAttributes, createProduct } from '../actions/productActions';

class NewProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barCodeRead: '',
      isBarCodeRead: false
    };
    this.onSubmit               = this.onSubmit.bind(this);
    this.openBarCodeScanner     = this.openBarCodeScanner.bind(this);
    this.onBarCodeRead          = this.onBarCodeRead.bind(this);
    this.closeBarCodeRead       = this.closeBarCodeRead.bind(this);
  }

  onSubmit() {
    this.props.createProduct(this.props.product);
  }

  openBarCodeScanner() {
    this.setState({isBarCodeRead: true});
  }

  closeBarCodeRead() {
    this.setState({isBarCodeRead: false});
  }

  onBarCodeRead(data) {
    this.props.changeProductAttributes({barcode: data.data})
    this.closeBarCodeRead();
  }

  componentWillReceiveProps({errors}) {
    if (errors) {
      Toast.show({
        text: errors
      })
    }
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <StockerHeader
          back
          title={"Nuevo Producto"}
          navigation={navigation}/>
          <ProductForm
            product={this.props.product}
            onSubmit={this.onSubmit}
            onChange={this.props.changeProductAttributes}/>
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

const mapStateToProps = state => ({
  product:  state.products.item,
  errors:   state.ui.errors,
});

export default connect(
  mapStateToProps, {
    createProduct,
    changeProductAttributes
  })(NewProductScreen);

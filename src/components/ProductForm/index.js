import React from 'react';
import { ListView, ScrollView, View } from 'react-native';
import { ActionButton, Subheader } from 'react-native-material-ui';
import { Text, Button, Container, Form, Item, Input, List, ListItem, Body, Right, Icon } from 'native-base'
import ScanBarCodeModal from '../ScanBarCodeModal'

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   name: props.product.name,
    //   barcode: props.product.barcode,
    //   price: props.product.price
    // }
    //this.onChange      = this.onChange.bind(this);
  }

  onChange(attributes) {
    this.props.changeProductAttributes(attributes)
  }

  render() {
    const { name, price, barcode } = this.props.product

    return (
      <Container>
        <Form>
          <Item>
            <Icon active name='md-barcode' />
            <Input
              placeholder="Código"
              value={this.props.product.barcode}
              onChangeText={text => this.props.onChange({barcode: text})}
              />
          </Item>
          <Item>
            <Icon active name='logo-usd' />
            <Input
              placeholder="Price"
              keyboardType='numeric'
              value={this.props.product.price.toString()}
              onChangeText={text => this.props.onChange({price: text})}
              />
          </Item>
          <Item>
            <Input
              placeholder="Nombre"
              value={this.props.product.name}
              onChangeText={text => this.props.onChange({name: text})}
            />
          </Item>
          <View>
            <Button full success onPress={() => this.props.onSubmit(this.state)}>
              <Text>Guardar</Text>
            </Button>
          </View>
        </Form>
      </Container>
    )
  }
}

export default ProductForm;

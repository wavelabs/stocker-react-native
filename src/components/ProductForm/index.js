import React from 'react';
import { ListView, ScrollView, View } from 'react-native';
import { ActionButton, Subheader } from 'react-native-material-ui';
import { Text, Button, Container, Form, Item, Input, List, ListItem, Body, Right, Icon } from 'native-base'
import ScanBarCodeModal from '../ScanBarCodeModal'

class ProductForm extends React.Component {
  onChange(attributes) {
    this.props.changeProductAttributes(attributes)
  }

  render() {
    const { name, price, barcode, stock } = this.props.product

    return (
      <Container>
        <Form>
          <Item>
            <Icon
              style={{textAlign:'center'}}
              active
              name='md-barcode'
            />
            <Input
              placeholder="Código"
              value={barcode}
              onChangeText={text => this.props.onChange({barcode: text})}
              />
          </Item>
          <Item>
            <Icon
              style={{textAlign:'center'}}
              active
              type='MaterialCommunityIcons'
              name='currency-usd'
            />
            <Input
              placeholder="Price"
              keyboardType='numeric'
              value={price ? price.toString() : ''}
              onChangeText={text => this.props.onChange({price: text})}
              />
          </Item>
          <Item>
            <Icon
              style={{textAlign:'center'}}
              active
              name='package'
              type='MaterialCommunityIcons'
            />
            <Input
              placeholder="Stock"
              keyboardType='numeric'
              value={stock ? stock.toString() : ''}
              onChangeText={text => this.props.onChange({stock: text})}
              />
          </Item>
          <Item>
            <Input
              placeholder="Nombre"
              value={name}
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

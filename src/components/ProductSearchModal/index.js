import React from 'react';
import { ScrollView, Modal } from 'react-native';

import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/productActions';

import { Right, Body, List, ListItem, Content, Header, Item, Icon, Input, Button, Text } from 'native-base';

class ProductSearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(text) {
    this.props.fetchProducts({ name: text, barcode: text });
  }

  render() {
    const { visible, products } = this.props;

    return (
      <Modal
        visible={visible}
        onRequestClose={() => {}}
      >
        <Header searchBar>
          <Item style={{flex: 8}}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={this.onChangeText}
            />
          </Item>
          <Right>
            <Button
              transparent
              onPress={this.props.onButtonClosePress}
            >
              <Icon name="close" />
            </Button>
          </Right>
        </Header>
        <Content>
          <ScrollView>
            <List
              dataArray={products}
              renderRow={(product) =>
                <ListItem
                  button
                  onPress={() => this.props.onProductSelected(product)}>
                  <Text>{product.name}</Text>
                </ListItem>
              }>
            </List>
          </ScrollView>
        </Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.items
});

export default connect(mapStateToProps, {
  fetchProducts
})(ProductSearchModal);

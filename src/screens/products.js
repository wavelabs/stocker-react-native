import React from 'react';
import { ScrollView } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import { Container, ListItem, Text, Right, Header, Body, Title, Button, Icon } from 'native-base';

import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';

class ProductsScreen extends React.Component {
  componentWillMount() {
    this.props.fetchProducts();
  }

  productList() {
    return this.props.products.map(product => (
      <ListItem key={product.id}>
        <Body>
          <Text>{product.name}</Text>
        </Body>
        <Right>
          <Text>{`$${product.price}`}</Text>
        </Right>
      </ListItem>
    ));
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <ScrollView>
          <Header>
            <Body>
              <Title>Lista de Productos</Title>
            </Body>
          </Header>
          {this.productList()}
        </ScrollView>
        <ActionButton
          onPress={() => {navigate('NewProduct')}}
      />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.items
});

export default connect(mapStateToProps, { fetchProducts })(ProductsScreen);

import React from 'react';
import { ScrollView } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import { Container, ListItem, Text, Right, Header, Body, Title, Button, Icon } from 'native-base';
import StockerHeader from '../components/StockerHeader';

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
        <StockerHeader
          drawer
          title={"Productos"}
          navigation={this.props.navigation}
        />
        <ScrollView>
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

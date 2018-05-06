import React from 'react';
import { Header, Body, Title, Left, Right, Button, Icon } from 'native-base';

class NewInvoiceHeader extends React.Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Nueva Venta</Title>
        </Body>
        <Right />
      </Header>
    )
  }
}

export default NewInvoiceHeader;

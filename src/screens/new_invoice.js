import React from 'react';
import { Container, Header, Body, Title, Left, Right, Button, Icon } from 'native-base';
import InvoiceForm from '../components/InvoiceForm';

export default class NewInvoiceScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Nueva Venta</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='camera' />
            </Button>
          </Right>
        </Header>
        <InvoiceForm
          navigate={this.props.navigation.navigate}/>
      </Container>
    )
  }
}

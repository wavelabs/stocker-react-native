import React from 'react';
import { ScrollView } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import { Container, ListItem, Text, Right, Header, Body, Title, Button, Icon } from 'native-base';

export default class InvoicesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoices: []
    }
  }
  componentWillMount() {
    fetch('http://192.168.1.2:3000/invoices')
      .then(res => res.json())
      .then(data => this.setState({invoices: data}))
  }

  render() {
    const { navigate } = this.props.navigation;
    const invoicesItems = this.state.invoices.map(invoice => (
      <ListItem key={invoice.id}>
        <Body>
          <Text>{`Venta #${invoice.id}`}</Text>
          <Text note>{`${invoice.invoice_lines_attributes.reduce((sum, item) => sum + item.quantity ,0)} productos`}</Text>
        </Body>
        <Right>
          <Text>{`$${invoice.total}`}</Text>
        </Right>
      </ListItem>
    ));

    return (
      <Container>
        <ScrollView>
          <Header>
            <Body>
              <Title>Lista de Ventas</Title>
            </Body>
          </Header>
          {invoicesItems}
        </ScrollView>
        <ActionButton
          onPress={() => {navigate('NewInvoice')}}
      />
      </Container>
    )
  }
}

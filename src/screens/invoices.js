import React from 'react';
import { ScrollView } from 'react-native';
import { ActionButton, ListItem } from 'react-native-material-ui';
import { Container, Header, Body, Title, Button, Icon } from 'native-base';

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
      <ListItem
        key={invoice.id}
        divider
        centerElement={{
          primaryText: invoice.id.toString(),
        }}
      />
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

import React from 'react';
import { ScrollView } from 'react-native';
import { Icon, Fab, Container, ListItem, Text, Right, Body } from 'native-base';
import StockerHeader from '../components/StockerHeader';

import { connect } from 'react-redux';
import { fetchInvoices } from '../actions/invoiceActions';

class InvoicesScreen extends React.Component {
  componentWillMount() {
    this.props.fetchInvoices();
  }

  render() {
    const { navigate } = this.props.navigation;
    const invoicesItems = this.props.invoices.map(invoice => (
      <ListItem key={invoice.id}>
        <Body>
          <Text>{`Venta #${invoice.id}`}</Text>
        </Body>
        <Right>
          <Text>{`$${invoice.total_amount}`}</Text>
        </Right>
      </ListItem>
    ));

    return (
      <Container>
        <StockerHeader
          drawer
          title={"Ventas"}
          navigation={this.props.navigation}
        />
        <ScrollView>
          {invoicesItems}
        </ScrollView>
        <Fab
          onPress={() => {navigate('NewInvoice')}}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  invoices: state.invoices.items
});

export default connect(mapStateToProps, { fetchInvoices })(InvoicesScreen);

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Spinner, Icon, Fab, Container, ListItem, Text, Right, Body } from 'native-base';
import StockerHeader from '../components/StockerHeader';

import { connect } from 'react-redux';
import { fetchInvoices } from '../actions/invoiceActions';

class InvoicesScreen extends React.Component {
  componentWillMount() {
    this.props.fetchInvoices();
  }

  invoicesList() {
    const { invoices } = this.props;

    return invoices.map(invoice => (
      <ScrollView>
        <ListItem key={invoice.id}>
          <Body>
            <Text>{`Venta #${invoice.id}`}</Text>
          </Body>
          <Right>
            <Text>{`$${invoice.total_amount}`}</Text>
          </Right>
        </ListItem>
      </ScrollView>
    ));
  }

  displayError() {
    const { errors } = this.props;

    return (
      <View>
        <Text>{errors}</Text>
      </View>
    )
  }

  render() {
    const { isFetching, errors } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <StockerHeader
          drawer
          title={"Ventas"}
          navigation={this.props.navigation}
        />
        { isFetching ? <Spinner /> : null}
        { !isFetching && !errors ? this.invoicesList() : null }
        { errors ? this.displayError() : null }
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
  invoices:   state.invoices.items,
  isFetching: state.ui.requests > 0,
  errors:      state.ui.errors
});

export default connect(mapStateToProps, { fetchInvoices })(InvoicesScreen);

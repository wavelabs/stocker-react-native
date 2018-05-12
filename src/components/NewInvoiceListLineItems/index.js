import React from 'react';
import { ListView, ScrollView, View } from 'react-native';
import { H3, Container, List, ListItem, Body, Text, Right, Button, Icon } from 'native-base';

import { connect } from 'react-redux';
import { removeLineItem } from '../../actions/invoiceActions';

class NewInvoiceListLineItems extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.props.items];
    const removedItems = newData.splice(rowId, 1);
    this.props.removeLineItem(newData, removedItems);
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      <Container>
        <View>
          <H3>Items</H3>
        </View>
        <ScrollView>
          <List
            disableRightSwipe={true}
            dataSource={this.ds.cloneWithRows(this.props.items)}
            renderRow={data =>
              <ListItem>
                <Body>
                  <Text>{data.name}</Text>
                  <Text note>{`$${data.price} x ${data.quantity}`}</Text>
                </Body>
                <Right>
                  <Text>$ {data.subtotal}</Text>
                </Right>
              </ListItem>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
            rightOpenValue={-75}
          />
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  removeLineItem
})(NewInvoiceListLineItems);

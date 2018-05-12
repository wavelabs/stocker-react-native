import React from 'react';
import StockerHeader from '../StockerHeader';
import { Header, Body, Title, Left, Right, Button, Icon } from 'native-base';

class NewInvoiceHeader extends React.Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <StockerHeader
        back
        navigation={navigation}
        title={"Nueva Venta"}
        right={
          <Right>
            <Button
              transparent
              onPress={this.props.onBulkButtonPress}
            >
              <Icon
                type="MaterialCommunityIcons"
                name="upload-multiple" />
            </Button>
          </Right>
        }/>
    )
  }
}

export default NewInvoiceHeader;

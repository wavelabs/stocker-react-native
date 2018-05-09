import React from 'react';
import { Header, Body, Title, Left, Right, Button, Icon } from 'native-base';

class StockerHeader extends React.Component {
  back() {
    return (
      <Left>
        <Button
          transparent
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon name="arrow-back" />
        </Button>
      </Left>
    )
  }

  title() {
    return (
      <Body style={{flex: 4}}>
        <Title>{this.props.title}</Title>
      </Body>
    )
  }

  drawer() {
    return (
      <Left>
        <Button
          transparent
          onPress={() => this.props.navigation.navigate('DrawerToggle')}
        >
          <Icon name="menu" />
        </Button>
      </Left>
    )
  }

  render() {
    return (
      <Header>
        { this.props.Left ? this.props.Left : null }
        { this.props.drawer ? this.drawer() : null }
        { this.props.back ? this.back() : null }
        { this.props.title ? this.title() : null }
        { this.props.body ? this.props.body : null }
        { this.props.right ? this.props.right : null }
      </Header>
    )
  }
}

export default StockerHeader;

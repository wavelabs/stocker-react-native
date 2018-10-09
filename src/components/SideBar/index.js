import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Container, Content, List, ListItem, Text, Icon, Left, Body, Right, Button } from 'native-base';

import { connect } from 'react-redux';

import { signOut } from "../../actions/currentUserActions";

const SideBar = (props) => {
  const { navigation, signOut } = props;

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
        <List>
          <ListItem
            icon
            button
            onPress={() => navigation.navigate('Products')}
          >
            <Left>
              <Icon name="md-list" />
            </Left>
            <Body>
              <Text>Productos</Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => navigation.navigate('Invoices')}
          >
            <Left>
              <Icon name="md-book" />
            </Left>
            <Body>
              <Text>Ventas</Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => signOut()}
          >
            <Left>
              <Icon name="exit" />
            </Left>
            <Body>
              <Text>Salir</Text>
            </Body>
          </ListItem>
        </List>
      </SafeAreaView>
    </ScrollView>
  )
}

const mapDispatchToProps = {
  signOut
}

export default connect(
  null,
  mapDispatchToProps
)(SideBar);

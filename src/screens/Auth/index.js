import React, {Component} from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, Text, Container, Tabs, Tab, Header, Body } from 'native-base';

import {connect} from 'react-redux';

import SignInTab from './SignInTab';
import SignUpTab from './SignUpTab';

import { isLoggedIn } from "../../reducers";

class AuthScreen extends Component {

    componentWillReceiveProps({isLoggedIn}) {
        if (isLoggedIn) {
            this.props.navigation.navigate('Main');
        }
    }

    render () {
        return (
            <Container>
                <Header hasTabs>
                    <Body>
                        <Text>Stocker</Text>
                    </Body>
                </Header>
                <Tabs>
                    <Tab heading="Ingresar">
                        <SignInTab />
                    </Tab>
                    <Tab heading="Registrarse">
                        <SignUpTab />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: isLoggedIn(state)
})

export default connect(
    mapStateToProps
)(AuthScreen);
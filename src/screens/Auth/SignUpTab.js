import React from 'react';
import { Spinner, Container, Text, Input, Item, Icon, Form, Button, Toast } from 'native-base';

import {connect} from 'react-redux';

import { signUp } from "../../actions/currentUserActions";

class SignUpTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
                password_confirmation: '',
                account_attributes: {
                    name: ''
                }
            }
        }

        this.changeUserAttribute = this.changeUserAttribute.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    changeUserAttribute(attribute) {
        this.setState({
            user: { ...this.state.user, ...attribute }
        });
    }

    authenticate() {
        this.props.signUp(this.state.user);
    }

    componentWillReceiveProps({errors}) {
        if (errors) {
            Toast.show({text: errors, type: 'danger'})
        }
    }

    render() {
        const { email, password, password_confirmation, account_attributes } = this.state.user;
        const { isLoading } = this.props;

        return (
            <Container>
                <Form>
                    <Item>
                        <Icon name="at" />
                        <Input 
                            placeholder="Email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => this.changeUserAttribute({email: text})}/>
                    </Item>
                    <Item>
                        <Icon name="key" />
                        <Input 
                            placeholder="Password" 
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => this.changeUserAttribute({password: text})} />
                    </Item>
                    <Item>
                        <Icon name="key" />
                        <Input 
                            placeholder="Confirmar password" 
                            secureTextEntry
                            value={password_confirmation}
                            onChangeText={(text) => this.changeUserAttribute({password_confirmation: text})} />
                    </Item>
                    <Item>
                        <Icon name="cart" />
                        <Input 
                            placeholder="Nombre de la Tienda" 
                            value={account_attributes.name}
                            onChangeText={(text) => this.changeUserAttribute({account_attributes: { name: text }})} />
                    </Item>
                    <Button 
                        full
                        onPress={this.authenticate}>
                        { isLoading ? 
                            <Spinner color="white" /> : 
                            <Text>Registrarse</Text> }
                    </Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    errors:    state.ui.errors,
    isLoading: state.ui.requests > 0
});

const mapDispatchToProps = {
    signUp
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(SignUpTab);
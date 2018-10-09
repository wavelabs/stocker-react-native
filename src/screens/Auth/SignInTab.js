import React from 'react';
import { Spinner, Container, Text, Input, Item, Icon, Form, Button, Toast } from 'native-base';

import {connect} from 'react-redux';

import { authenticate } from "../../actions/currentUserActions";

class SignInTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.changeAttribute = this.changeAttribute.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    changeAttribute(attribute) {
        this.setState(attribute)
    }

    authenticate() {
        this.props.authenticate(this.state.email, this.state.password)
    }

    componentWillReceiveProps({errors}) {
        if (errors) {
            Toast.show({text: errors, type: 'danger'});
        }
    }

    render() {
        const { email, password } = this.state;
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
                            onChangeText={(text) => this.changeAttribute({email: text})}/>
                    </Item>
                    <Item>
                        <Icon name="key" />
                        <Input 
                            placeholder="Password" 
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => this.changeAttribute({password: text})} />
                    </Item>
                    <Button 
                        full
                        onPress={this.authenticate}>
                        { isLoading ? 
                            <Spinner color="white" /> : 
                            <Text>Ingresar</Text> }
                    </Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.ui.errors,
    isLoading: state.ui.requests > 0
});

const mapDispatchToProps = {
    authenticate
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(SignInTab);
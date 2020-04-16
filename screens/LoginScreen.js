import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'native-base';
import * as firebase from 'firebase';

export class LoginScreen extends React.Component {
    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    handleLogin = () => {
        const {email, password} = this.state;

        firebase.auth()
        .signInWithEmailAndPassword(email,password)
        .then(
            this.props.navigation.navigate('Home',{
                itemId: 1,
                otherParam: ''
            })
        )
        .catch(error => this.setState({ errorMessage: error.message }));
    }

    render () {
        return (
            <View>
                <Text>
                    {`Hello again`}
                </Text>

                <View>
                    {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
                </View>

                <View>
                    <Text>Email Adress</Text>
                    <TextInput 
                        autoCapitalize="none" 
                        style={{borderBottomColor: '#333',borderBottomWidth: 1, marginHorizontal: 10}}
                        onChangeText={email => this.setState({ email })} // TODO: move to function
                        value={this.state.email}
                    ></TextInput>
                </View>

                <View>
                    <Text>Password</Text>
                    <TextInput 
                        autoCapitalize="none" 
                        style={{borderBottomColor: '#333',borderBottomWidth: 1, marginHorizontal: 10}}
                        onChangeText={password => this.setState({ password })} // TODO: move to function
                        value={this.state.password}
                    ></TextInput>
                </View>
                <Button 
                    block 
                    style={{marginHorizontal: 10}}
                    onPress={this.handleLogin}
                ><Text>Sing In</Text></Button>
                <Button 
                    block 
                    success 
                    style={{marginHorizontal: 10}}
                    onPress={() => this.props.navigation.navigate('Register',{
                        itemId: 1,
                        otherParam: ''
                    })}    
                ><Text>New? Sing Up</Text></Button>
            </View>
        )
    }
}
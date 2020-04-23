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
            <View style={style.container}>
                <Text style={style.title}>
                    {`Hello again!`}
                </Text>

                <View>
                    {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
                </View>

                <View>
                    <Text>Email Adress</Text>
                    <TextInput 
                        autoCapitalize="none" 
                        style={style.input}
                        onChangeText={email => this.setState({ email })} // TODO: move to function
                        value={this.state.email}
                    ></TextInput>
                </View>

                <View>
                    <Text>Password</Text>
                    <TextInput 
                        autoCapitalize="none" 
                        style={style.input}
                        onChangeText={password => this.setState({ password })} // TODO: move to function
                        value={this.state.password}
                    ></TextInput>
                </View>
                <Button 
                    block 
                    style={{marginBottom: 20}}
                    onPress={this.handleLogin}
                ><Text style={{color: 'white'}}>Sing In</Text></Button>
                <Button 
                    block 
                    success
                    onPress={() => this.props.navigation.navigate('Register',{
                        itemId: 1,
                        otherParam: ''
                    })}    
                ><Text>New? Sing Up</Text></Button>
            </View>
        )
    }
}

const style = new StyleSheet.create({
    title: {
        marginVertical: 20,
        fontSize: 20
    },
    container: {
        paddingHorizontal: 15
    },
    input: {
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        marginBottom: 20
    }
})
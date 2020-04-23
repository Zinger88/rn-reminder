import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'native-base';
import * as firebase from 'firebase';

export class RegisterScreen extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        errorMessage: null
    }

    handleSignUp = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName: this.state.name
            })
        }).then(
            this.props.navigation.navigate('Home',{
                itemId: 1,
                otherParam: ''
            })
        )
        .catch(error => this.setState({errorMessage: error.message}))
    } 

    render () {
        return (
            <View style={style.container}>
                <Text style={style.title}>
                    {`HI MAN! SING UP TO GET STARTED`}
                </Text>

                <View>
                    {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
                </View>

                <View>
                    <Text>Full Name</Text>
                    <TextInput 
                        autoCapitalize="none" 
                        style={style.input}
                        onChangeText={name => this.setState({ name })} // TODO: move to function
                        value={this.state.name}
                    ></TextInput>
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
                    warning
                    style={{marginBottom: 10}}
                    onPress={this.handleSignUp}
                ><Text>Sing UP</Text></Button>
                <Button 
                    block 
                    success 
                    onPress={() => this.props.navigation.navigate('Login',{
                        itemId: 1,
                        otherParam: ''
                    })}    
                ><Text style={{color: 'white'}}>Login</Text></Button>
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
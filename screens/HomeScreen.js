import React from 'react';
import { ImageBackground, StyleSheet, Modal, TouchableHighlight, View, Alert } from 'react-native';
import { Button, Container, Header, Content, List, ListItem, Text, Textarea } from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export class HomeScreen extends React.Component {
    state = {
        email: '',
        displayName: '',
        modalVisible: false,
        reminders: [],
        textCache: ''
    }

    componentWillUnmount() {
        console.log('I think need to work with state & save reminders to DATABASE ONCE (general idea)')
        // I think need to work with state & save reminders to DATABASE ONCE (general idea) 
    }

    componentDidMount() {
        firebase.auth().signInWithEmailAndPassword('kylinar88@gmail.com','271289')
        .catch((error)=>{ Alert.alert("Error", error.message); });

        const db = firebase.firestore();
        const reminders = [];
        db.collection('reminders').get().then((snapshot)=>{
            snapshot.docs.forEach((doc) => {
                const remind = {...doc.data(), id: doc.id};
                reminders.push(remind);
            })
            const {email, displayName} = firebase.auth().currentUser;
            this.setState({email, displayName, reminders});
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    signOutUser = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate('Login',{
            itemId: 1,
            otherParam: reminder
        })

    }

    createRemind = () => {
        console.log('tut');
    }

    addRemind = (title) => {
        const newRemind = {
            title: title ? title : 'Заметка без названия',
            date: Date.now(),
            description: 'Not now'
        }

        this.setState({
            reminders: [...this.state.reminders, newRemind],
            textCache: '',
            modalVisible: false
        });

        const db = firebase.firestore(); // need to create global database
        db.collection('reminders').add(newRemind);
    }

    removeRemind = (id) => () => {
        const newRemindersArray = this.state.reminders.filter(i => i.id !== id)
        
        this.setState({
            reminders: newRemindersArray
        });

        const db = firebase.firestore(); // need to create global database
        db.collection('reminders').doc(id).delete();
    }

    writeRemind = (text) => {
        this.setState({
            textCache: text
        })
    }

    setModalVisible = (visible) => {
        this.setState({ 
            modalVisible: visible,
            textCache: '' 
        });
    }

    render() {
        return(
            <ImageBackground source={{uri: 'https://i.pinimg.com/originals/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg'}} style={{width: '100%', height: '100%', opacity: 0.7}}>
                <Container style={style.container}>
                    <Modal
                        animationType="slide" 
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View
                            style={style.modalContainer}
                        >
                            <View
                                style={style.modalWhiteWindow}
                            >
                                <TouchableHighlight
                                    style={style.modalCloseButton}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                >
                                    <Text>x</Text>
                                </TouchableHighlight>
                                <View style={style.modalView}>
                                    <Text style={{marginBottom: 10}}>Write your remind</Text>
                                    <Textarea
                                        onChangeText={text => this.writeRemind(text)}
                                        style={style.modalTextarea}
                                    ></Textarea>
                                    <Button
                                        onPress={()=> this.addRemind(this.state.textCache)}
                                    >
                                        <Text>Готово!</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Content>
                        <Text style={style.title}>{`Yo ${this.state.displayName || this.state.email}, lets check you business`}</Text>
                        <Button 
                            //onPress={this.createRemind}
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}
                            light 
                            block 
                            style={{paddingHorizontal: 15}}>
                            <Text>Добавить напоминалку</Text>
                        </Button>
                        <List>
                        {this.state.reminders.map((reminder, index) => {
                            return (
                            <ListItem 
                                key={index + Math.random()}
                                onLongPress={this.removeRemind(reminder.id)}
                                onPress={() => this.props.navigation.navigate('Notify',{
                                    itemId: 1,
                                    otherParam: reminder
                                })}
                            >
                                <Text>{reminder.title}</Text>
                            </ListItem>
                            )
                        })}
                        </List>
                    </Content>
                    <Button
                        style={{marginBottom: 10, justifyContent: 'center'}}
                        onPress={this.signOutUser}
                    >
                        <Text
                            style={{color: 'white'}}
                        >
                            Log Out
                        </Text>
                    </Button>
                </Container>
            </ImageBackground>
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
    },
    modalContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    modalView: {
        
    }, 
    modalWhiteWindow: {
        position: 'relative',
        backgroundColor: 'white',
        padding: 20,
        width: '90%',
        borderRadius: 5
    }, 
    modalTextarea: {
        borderWidth: 1, 
        borderColor: '#eee',
        borderRadius: 3,
        marginBottom: 10
    }, 
    modalCloseButton: {
        position: 'absolute',
        width: 20, 
        height: 20, 
        borderRadius: 20,
        borderWidth: 1, 
        borderColor: '#e7e7e7',
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
        right: 10,
    }
})
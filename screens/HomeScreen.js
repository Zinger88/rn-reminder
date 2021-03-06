import React from 'react';
import { ImageBackground, StyleSheet, Vibration, Platform, Alert } from 'react-native';
import { Button, Container, Header, Content, List, ListItem, Text, Spinner, Icon } from 'native-base';
import { ModalComponent } from '../components/ModalComponent'
import * as firebase from 'firebase';
import 'firebase/firestore';
import { format } from 'date-fns';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Constants from 'expo-constants';

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export class HomeScreen extends React.Component {
    state = {
        email: '',
        displayName: '',
        modalVisible: false,
        reminders: [],
        isPickerVisible: false,
        pickerType: 'date',
        expoPushToken: '',
        notification: {}
    }

    componentWillUnmount() {
        //console.log('need to add redux')
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

        this.registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            let token = await Notifications.getExpoPushTokenAsync();
            console.log(token);
            this.setState({ expoPushToken: token });
        } else {
            alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    };

    _handleNotification = notification => {
        Vibration.vibrate();
        console.log(notification);
        this.setState({ notification: notification });
    };

    // NEED TO GET DATA FROM NOTIFICATION
    // CALCULATE DELAY 
    // 21.05.20 00:18 OHOHOHOHO YEA))))))))))))

    sendPushNotification = async () => {
        console.log(this.state.notification)
        const message = {
            to: this.state.expoPushToken,
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!',
            data: { data: 'goes here' },
            _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    };

    signOutUser = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate('Login',{
            itemId: 1,
            otherParam: reminder
        })

    }

    addRemind = (cache) => {
        const newRemind = {
            title: cache.title ? cache.title : 'Заметка без названия',
            date:  cache.date || Date.now(),
        }
        this.setState({
            reminders: [...this.state.reminders, newRemind],
            modalVisible: false
        });
        const db = firebase.firestore(); // need to create global database
        db.collection('reminders').add(newRemind);

        this.sendPushNotification() // NOT HERE !
    }

    removeRemind = (id) => () => {
        const newRemindersArray = this.state.reminders.filter(i => i.id !== id)
        
        this.setState({
            reminders: newRemindersArray
        });

        const db = firebase.firestore(); // need to create global database
        db.collection('reminders').doc(id).delete();
    }

    setModalVisible = (visible) => {
        this.setState({ 
            modalVisible: visible,
        });
    }

    render() {
        return(
            <ImageBackground source={{uri: 'https://i.pinimg.com/originals/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg'}} style={{width: '100%', height: '100%', opacity: 0.7}}>
                <Container style={style.container}>
                    <ModalComponent
                        modalVisible={this.state.modalVisible}
                        setModalVisible={this.setModalVisible}
                        addRemind={this.addRemind}
                    ></ModalComponent>
                    <Text style={style.title}>{`Yo ${this.state.displayName || this.state.email}, lets check you business`}</Text>
                    <Button
                        onPress={() => this.setModalVisible(!this.state.modalVisible)}
                        light 
                        block 
                        style={{paddingHorizontal: 15}}>
                        <Text>Добавить напоминалку</Text>
                    </Button>
                    <Content>
                        {this.state.reminders.length ? (
                            <List>
                                {this.state.reminders.map((reminder, index) => {
                                    return (
                                    <ListItem 
                                        key={index + Math.random()}
                                        onLongPress={this.removeRemind(reminder.id)}
                                        onPress={() => this.props.navigation.navigate('Notify',{
                                            itemId: reminder.id,
                                            otherParam: reminder
                                        })}
                                        style={{flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center'}}
                                    >
                                        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{reminder.title}</Text>
                                        <Text>{format(reminder.date, 'PP / pp')}</Text>
                                    </ListItem>
                                    )
                                })}
                            </List>
                        ) : (
                            <Spinner color='blue' />
                        )}
                    </Content>
                    <Button
                        style={{marginBottom: 10, justifyContent: 'center'}}
                        onPress={this.signOutUser}
                    >
                        <Text style={{color: 'white'}}>Log Out</Text>
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
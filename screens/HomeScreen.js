import React from 'react';
import { ImageBackground, StyleSheet, Modal, TouchableHighlight, View } from 'react-native';
import { Button, Container, Header, Content, List, ListItem, Text, Textarea } from 'native-base';
import * as firebase from 'firebase';

const reminders = [
    {
        id: Math.random() * 21,
        title: 'Позвонить Светке',
        date: Date.now() + 1000 * 5,
        description: 'Лучше утром не звонить'
    },
    {
        id: Math.random() * 21,
        title: 'Zakomitits"a',
        date: Date.now() + 1000 * 5,
        description: 'Коммитнуть точно надо'
    },
    {
        id: Math.random() * 21,
        title: 'Забабахать прилагу',
        date: Date.now() + 1000 * 5,
        description: 'Сделать от души чтобы бло что показать)'
    }
]

export class HomeScreen extends React.Component {
    state = {
        email: '',
        displayName: '',
        modalVisible: false,
        reminders: reminders,
        textCache: ''
    }

    componentDidMount() {
        //const {email, displayName} = firebase.auth().currentUser;
        //this.setState({email, displayName});
    }

    signOutUser = () => {
        firebase.auth().signOut()
    }

    createRemind = () => {
        console.log('tut');
    }

    addRemind = (title) => {
        const newRemind = {
            id: Math.random() * 21,
            title: title ? title : 'Заметка без названия',
            date: Date.now(),
            description: 'новая заметка'
        }
        
        this.setState({
            reminders: [...this.state.reminders, newRemind],
            textCache: '',
            modalVisible: false
        });
    }

    removeRemind = (id) => () => {
        const newRemindersArray = this.state.reminders.filter(i => i.id !== id)

        this.setState({
            reminders: newRemindersArray
        })
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
                        <Text style={style.title}>{`Yo ${this.state.email}, lets check you business`}</Text>
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
import React from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { Button, Container, Header, Content, List, ListItem } from 'native-base';
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
        reminders: reminders
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

    addRemind = () => {
        const newRemind = {
            id: Math.random() * 21,
            title: 'Заметка',
            date: Date.now(),
            description: 'новая заметка'
        }

        this.setState({
            reminders: [...this.state.reminders, newRemind]
        })
    }

    removeRemind = (id) => () => {
        const newRemindersArray = this.state.reminders.filter(i => i.id !== id)

        this.setState({
            reminders: newRemindersArray
        })
    }


    render() {
        return(
            <ImageBackground source={{uri: 'https://i.pinimg.com/originals/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg'}} style={{width: '100%', height: '100%', opacity: 0.7}}>
                <Container style={style.container}>
                    <Content>
                        <Text style={style.title}>{`Yo ${this.state.email}, lets check you business`}</Text>
                        <Button 
                            //onPress={this.createRemind}
                            onPress={this.addRemind}
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
    }
})
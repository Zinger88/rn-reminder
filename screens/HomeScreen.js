import React from 'react';
import { Text, ImageBackground } from 'react-native';
import { Button, Container, Header, Content, List, ListItem } from 'native-base';
import * as firebase from 'firebase';

const reminders = [
    {
        title: 'Позвонить Светке',
        date: Date.now() + 1000 * 5,
        description: 'Лучше утром не звонить'
    },
    {
        title: 'Zakomitits"a',
        date: Date.now() + 1000 * 5,
        description: 'Коммитнуть точно надо'
    },
    {
        title: 'Забабахать прилагу',
        date: Date.now() + 1000 * 5,
        description: 'Сделать от души чтобы бло что показать)'
    }
]

export class HomeScreen extends React.Component {
    state = {
        email: '',
        displayName: ''
    }

    componentDidMount() {
        //const {email, displayName} = firebase.auth().currentUser;
        //this.setState({email, displayName});
    }

    signOutUser = () => {
        firebase.auth().signOut()
    }

    render() {
        return(
            <ImageBackground source={{uri: 'https://i.pinimg.com/originals/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg'}} style={{width: '100%', height: '100%', opacity: 0.7}}>
                <Container>
                    <Content>
                        <Text>{`Hi ${this.state.email}`}</Text>
                        <Button 
                        light 
                        block 
                        style={{paddingHorizontal: 15}}>
                            <Text>Добавить напоминалку</Text>
                        </Button>
                        <List>
                        {reminders.map((reminder, index) => {
                            return (
                            <ListItem 
                                key={index + Math.random()}
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
                        <Button
                            onPress={this.signOutUser}
                        >
                            <Text>
                                Log Out
                            </Text>
                        </Button>
                    </Content>
                </Container>
            </ImageBackground>
        )
    }
}
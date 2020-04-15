import React from 'react';
import { Text, ImageBackground } from 'react-native';
import { Button, Container, Header, Content, List, ListItem } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const reminders = [
    {
        title: 'Позвонить Светке',
        date: Date.now() + 1000 * 5
    },
    {
        title: 'Zakomitits"a',
        date: Date.now() + 1000 * 5
    },
    {
        title: 'Забабахать прилагу',
        date: Date.now() + 1000 * 5
    }
]

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ImageBackground source={{uri: 'https://i.pinimg.com/originals/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg'}} style={{width: '100%', height: '100%', opacity: 0.7}}>
                <Container>
                {/* <Header /> */}
                    <Content>
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
                                onPress={() => this.props.navigation.navigate('Notify')}
                            >
                                <Text>{reminder.title}</Text>
                            </ListItem>
                            )
                        })}
                        </List>
                    </Content>
                </Container>
            </ImageBackground>
        )
    }
}
import React from 'react';
import { Text, ImageBackground } from 'react-native';
import { Button, Container, Header, Content, List, ListItem } from 'native-base';

export class Notify extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ImageBackground source={{uri: 'https://i.pinimg.com/originals/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg'}} style={{width: '100%', height: '100%', opacity: 0.7}}>
                <Container>
                {/* <Header /> */}
                    <Content>
                        <Text>Цэ заметка</Text>
                    </Content>
                </Container>
            </ImageBackground>
        )
    }
}
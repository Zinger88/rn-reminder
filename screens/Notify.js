import React from 'react';
import { Text, ImageBackground } from 'react-native';
import { Button, Container, Header, Col, Grid, Content, List, ListItem } from 'native-base';

export class Notify extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, date, description} = this.props.route.params.otherParam;
        const newDateObj = new Date(date);
        const month = newDateObj.getMonth() + 1;
        const year = newDateObj.getFullYear();
        const day = newDateObj.getDate();
        const hour = newDateObj.getHours();
        const minutes = newDateObj.getMinutes();
        return(
            <ImageBackground source={{uri: 'https://i.pinimg.com/originals/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg'}} style={{width: '100%', height: '100%', opacity: 0.7}}>
                <Container>
                    <Content>
                    <Grid>
                        <Col style={{ backgroundColor: '#635DB7', height: 50 }}>
                            <Text>{title}</Text>
                        </Col>
                        <Col style={{ backgroundColor: '#635DB7', height: 50 }}>
                            <Text>{`${day}.${month} ${year} / ${hour} : ${minutes}`}</Text>
                        </Col>
                    </Grid>
                    <Grid>
                        <Col style={{ backgroundColor: '#e5e5e5', height: 100 }}>
                            <Text>{description}</Text>
                        </Col>
                    </Grid>
                    </Content>
                </Container>
            </ImageBackground>
        )
    }
}
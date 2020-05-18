import React from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { Button, Container, Col, Grid, Content } from 'native-base';
import { format } from 'date-fns';
import { ModalComponent } from '../components/ModalComponent';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export class Notify extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            isPickerVisible: false,
            pickerType: 'date'
        }
    }

    // REDUX !!!!!!! Hehehe
    // Update firebase , then need to Update data.


    changeRemind = (data) => {
        console.log(data)
        this.setModalVisible(false);
        const db = firebase.firestore();
        // works fine
        db.collection('reminders').doc(this.props.route.params.otherParam.id).update({
            title: data.title || this.props.route.params.otherParam.title,
            date: data.date || this.props.route.params.otherParam.date
        });
    }

    setModalVisible = (visible) => {
        this.setState({ 
            modalVisible: visible,
        });
    }

    render() {
        const {title, date} = this.props.route.params.otherParam;
        const formatedDate = format(date, 'PP / pp');
        return(
            <ImageBackground source={{uri: 'https://i.pinimg.com/originals/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg'}} style={{width: '100%', height: '100%', opacity: 0.7}}>
                <Container>
                    <Content>
                    <Grid>
                        <Col style={style.title}>
                            <Text style={style.titleText}>{title}</Text>
                        </Col>
                    </Grid>
                    <Grid>
                        <Col style={style.date}>
                            <Text style={style.dateText}>{formatedDate}</Text>
                        </Col>
                    </Grid>
                    <Button
                        onPress={() => this.setModalVisible(true)}
                        light 
                        block 
                        style={{paddingHorizontal: 15, marginHorizontal: 30}}>
                        <Text>РЕДАКТИРОВАТЬ</Text>
                    </Button>
                    </Content>

                    <ModalComponent
                        modalVisible={this.state.modalVisible}
                        setModalVisible={this.setModalVisible}
                        addRemind={this.changeRemind}
                    ></ModalComponent>
                </Container>
            </ImageBackground>
        )
    }
}

const style = new StyleSheet.create({
    title : {
        height: 'auto',
        margin: 30,
        paddingBottom: 20,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#c5c5c5'
    },
    titleText: {
        fontSize: 26,
        textAlign: 'center'
    },
    date: {
        marginBottom: 30
    },
    dateText: {
        textAlign: 'center',
        fontSize: 20
    }
})
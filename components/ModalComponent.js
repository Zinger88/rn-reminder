import React from 'react';
import { StyleSheet, Modal, TouchableHighlight, View, Alert } from 'react-native';
import { Button, Text, Textarea } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns';

export class ModalComponent extends React.Component {
    /**
     * Move PICKER TO THIS COMPONENT
     * COMPONENT WILL HAVE CACHE AND RETURN DATA
     */

    state = {
        title: '',
        date: '',
        pickerType: 'date',
        isPickerVisible: false,
    }

    addRemind = (remind) => {
        this.props.addRemind(remind);
    }

    writeRemind = (text) => {
        this.setState({
            title: text
        })
    }

    handlePickerConfirm = (date) => {
        console.log(format(date, 'T'))
        const dateToFormat = +format(date, 'T');
        this.setState({
            date: dateToFormat,
            isPickerVisible: false
        });
    }

    showPicker = (type) => {
        this.setState({
            pickerType: type,
            isPickerVisible: true
        });
    }

    hidePicker = () => {
        this.setState({isPickerVisible: false})
    }

    // NEED TO WRITE CLOSE MODAL METHOD WITH  CLEAR STATE

    render() {
        return (
            <Modal
                animationType="slide" 
                transparent={true}
                visible={this.props.modalVisible}
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
                        <TouchableHighlight                   // strange tap 
                            style={style.modalCloseButton}
                            onPress={() => {
                                this.props.setModalVisible(false);
                            }}
                        >
                            <Text>X</Text>
                        </TouchableHighlight>
                        <View style={style.modalView}>
                            <Text style={{marginBottom: 10}}>Write your remind</Text>
                            <Textarea
                                onChangeText={text => this.writeRemind(text)}
                                style={style.modalTextarea}
                            ></Textarea>
                            <Button
                                bordered
                                dark
                                style={{marginBottom: 10}}
                                onPress={()=> this.showPicker('date')}
                            >
                            <Text>Выбрать дату</Text> 
                            </Button>
                            <Button
                                bordered
                                dark
                                style={{marginBottom: 10}}
                                onPress={()=> this.showPicker('time')}
                            >
                            <Text>Выбрать время</Text> 
                            </Button>
                            <DateTimePickerModal
                                isVisible={this.state.isPickerVisible}
                                mode={this.state.pickerType}
                                onConfirm={this.handlePickerConfirm}
                                onCancel={this.hidePicker}
                            />
                            <View style={{marginBottom: 10}}>
                                <Text>{this.state.date ? format(this.state.date, 'PP / pp') : 'Дата не выбрана'}</Text>
                            </View>
                            <Button
                                onPress={()=> this.addRemind(this.state)}
                            >
                                <Text>Готово!</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
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
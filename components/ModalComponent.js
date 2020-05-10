import React from 'react';
import { ImageBackground, StyleSheet, Modal, TouchableHighlight, View, Alert } from 'react-native';
import { Button, Container, Header, Content, List, ListItem, Text, Textarea } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export class ModalComponent extends React.Component {
    /**
     * Move PICKER TO THIS COMPONENT
     * COMPONENT WILL HAVE CACHE AND RETURN DATA
     */

    render() {
        return (
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
                            <Button
                                onPress={()=> this.addRemind(this.state.cache)}
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
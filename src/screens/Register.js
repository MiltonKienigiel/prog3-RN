import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {auth} from '../firebase/config'
import {NavigationContainer} from '@react-navigation/native'


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "", 
            username: "",
            error: ""
        }
    }

    register (){
        if(this.state.email != "" && this.state.password !== "" && this.state.username !== "" ){
            this.props.handleRegister(this.state.email, this.state.password, this.state.username)
        } // IF
        else{
            alert('¡Completar los campos!')
        }

    } // Register

    render() {
        return (
            <View style={styles.container}>
                <Text>Registrarme</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                />

                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder="Username"
                    onChangeText={text => this.setState({ username: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='number-pad'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />

                <TouchableOpacity style = {styles.button} onPress={() => this.register()}>
                    <Text style = {styles.text}> Register </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    field: {
        width: '80%',
        backgroundColor: "#09009B",
        color: '#FFA400',
        padding: 10,
        marginVertical: 10
    },
    button: {
        width: '30%',
        backgroundColor: "#0F00FF",
    },
    text: {
        color: '#FFA400'
    }
})
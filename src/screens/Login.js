import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth } from '../firebase/config';
import {NavigationContainer} from '@react-navigation/native'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loggedIn: false,
            error: ""
        }
    }

    login(){
        if (this.state.email == '' || this.state.password == ''){
            alert('Todos los campos son obligatorios.')
        } else if (!this.state.email.includes('@')){
            alert('El formato de e-mail no es válido.')
        } else {
            this.props.handleLogin(this.state.email,this.state.password)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="E-mail"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.login()}>
                    <Text style = {styles.text}> Ingresar </Text>
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
        color: '#FFA400',
        textAlign: 'center'
    }
})
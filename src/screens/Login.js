import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth } from '../firebase/config';

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

    handleLogin() {
        auth.signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(response => {
            console.log(response)
            alert('usuario logueado')
            this.setState({
                loggedIn: true
            })
        })
        .catch( error => {
            console.log(error);
            alert("Error en el inicio de sesión.");
            this.setState({
                error: "Error en el inicio de sesión."
            })
        })
        
    } //Login

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='number-pad'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.handleLogin()}>
                    <Text style = {styles.text}> Login </Text>
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
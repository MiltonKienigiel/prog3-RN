import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import CreatePost from '../screens/CreatePost'
import { auth } from '../firebase/config';


export default class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            error: null,
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => { // Para mantener logueado a un usuario
            if (user) {
                this.setState({
                    loggedIn: true
                })
            }
        })
    }
  
    render(){
        const Stack = createDrawerNavigator()

        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name = "Home" component={()=> <Home/>}></Stack.Screen>
                    <Stack.Screen name = "Register" component={()=> <Register/>}></Stack.Screen>
                    <Stack.Screen name = "Login" component={()=> <Login/>}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
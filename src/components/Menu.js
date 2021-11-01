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
    } //Component

    handleRegister(email,password, username) {
        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            console.log(response);
            alert("¡Usuario registrado!");
            response.user.updateProfile({
                displayName: username
            })
            this.setState({
                loggedIn: true
            })
        })
        .catch( error => {
            console.log(error);
            alert("Error en el registro");
            this.setState({
                error: "Fallo en el registro"
            })
        })
    } //Register

    handleLogin(email,password) {
        auth.signInWithEmailAndPassword(email,password)
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

    handleLogout(){
        auth.signOut()
        .then (() =>{
            this.setState ({
                loggedIn: false
            })
            alert('Cerraste sesión')
        })
        .catch(error =>{
            console.log(error)
            alert('Error en el deslogueo')
        })
    } //Logout
  
    render(){
        const Drawer = createDrawerNavigator()

        return (
                <Drawer.Navigator initialRouteName="Login">
                    {this.state.loggedIn === true ? 

                    <>
                        <Drawer.Screen name = "Home">
                        {props => <Home {...props} handleLogout={()=>this.handleLogout()}/>}
                        </Drawer.Screen>
                        <Drawer.Screen name= "CreatePost">
                            {props => <CreatePost {...props}/>}
                        </Drawer.Screen>
                    </>
                    :
                    <>
                        <Drawer.Screen name="Login">
                            {props => <Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                        </Drawer.Screen>
                        <Drawer.Screen name = "Registro">
                            {props => <Register {...props} handleRegister={(email, password, username)=>this.handleRegister(email, password, username)}/>}
                        </Drawer.Screen>
                    </>
                }
                </Drawer.Navigator>


        ); // Return
    } // Render
} // Component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
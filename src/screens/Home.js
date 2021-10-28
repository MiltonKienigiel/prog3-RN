import React, { Component }  from "react";
import { Text, View, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {auth} from '../firebase/config'

export default class Home extends Component{
    constructor (props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <Text> Home </Text>
                <Text> ¡Hola {auth.currentUser.email}! </Text>
                <TouchableOpacity onPress={()=> this.props.handleLogout()}>
                    <Text> Cerrar sesión </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'yellow'
    }
})
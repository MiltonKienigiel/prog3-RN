import React, { Component }  from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {auth, db} from "../firebase/config";

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: ""
        }
    } // Constructor

    handlePost(){
        db.collection('posts').add({
            owner: auth.currentUser.displayName,
            description: this.state.comment,
            createdAt: Date.now()
        })
        .then(response=>{
            console.log(response)
            alert('Posteo Realizado')
            this.setState({
                comment: ""
            })
            this.props.navigation.navigate('Home')
            .catch(error =>{
                alert('Hubo un error')
            })

        }) //THEN
    } // Handle post

    render(){
        return(
            <View>
                <TextInput
                    keyboardType='default'
                    placeholder= '¿En qué estás pensando?'
                    multiline = {true}
                    numberOfLines= {4}
                    onChangeText= {text => this.setState({comment: text})}
                    value = {this.state.comment}

                />
                <TouchableOpacity onPress={()=> this.handlePost()}>
                    <Text> Post </Text>
                </TouchableOpacity>
            </View>
        )
    }

   
}// Create Post
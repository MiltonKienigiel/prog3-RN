import React, { Component }  from "react";
import { Text, View, StyleSheet} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class Home extends Component{
    constructor (props){
        super(props);
        this.state = {
            posts: []
        }
    } // Constructor

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs=> {
                let postsAux= []
                docs.forEach (doc =>{
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                }) // For each
                this.setState({
                    posts: postsAux
                })
            }// docs
        ) //Snapshot
    } //Component

    render(){
        return(
            <View style={styles.container}>
                <Text> ¡Hola {auth.currentUser.displayName}!</Text>
                <FlatList
                    data = {this.state.posts}
                    keyExtractor = {post => post.id.toString()}
                    renderItem= {({item})=>
                        <Post dataItem = {item}></Post>}
                /> 
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
import React, { Component }  from "react";
import { Text, View, StyleSheet, ActivityIndicator} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class Home extends Component{
    constructor (props){
        super(props);
        this.state = {
            posts: [],
            loaderPost: true
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
                    posts: postsAux,
                    loaderPost: false
                })
            }// docs
        ) //Snapshot

    } //Component

    render(){
        return(
            <View style={styles.container}>
                  {this.props.loader || this.state.loaderPost? (
                      <ActivityIndicator size='large' color='blue'/>

                  ): 
                <>
                <Text> ¡Hola {auth.currentUser.displayName}!</Text>
                <FlatList
                    data = {this.state.posts}
                    keyExtractor = {post => post.id.toString()}
                    renderItem= {({item})=>
                        <Post dataItem = {item}></Post>}
                /> 
                </> }
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
        backgroundImage: 'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)',
    }
})
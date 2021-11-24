import React, { Component }  from "react";
import { Text, View, StyleSheet, ActivityIndicator, TextInput} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class Search extends Component{
    constructor (props){
        super(props);
        this.state = {
            posts: [],
            loaderPost: true,
            searchInput: "",
            users: []
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
        db.collection('users').onSnapshot(
            docs=> {
                let usersAux= []
                docs.forEach (doc =>{
                    usersAux.push({
                        data: doc.data()
                    })
                }) // For each
                this.setState({
                    users: usersAux,
                    loaderPost: false
                })
            }// docs
        ) //Snapshot
    } //Component

    render(){
        let filteredPosts = this.state.searchInput.length > 0
            ? this.state.posts.filter(element => element.data.owner.includes(this.state.searchInput)) 
            : this.state.posts
        
        let filteredUsers = this.state.searchInput.length > 0
            ? this.state.users.filter(element =>  element.data.username.includes(this.state.searchInput))
            : this.state.users

        return(
            <View style={styles.container}>
            {this.props.loader || this.state.loaderPost
            ? (<ActivityIndicator size='large' color='blue'/>)
            : <>
                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Buscar usuario..."
                    placeholderTextColor="black"
                    onChangeText={text => this.setState({searchInput: text})}
                />
                {filteredUsers.length > 0
                    ? filteredPosts.length > 0
                        ? <FlatList
                            style={styles.flatlist}
                            showsHorizontalScrollIndicator={false}
                            data = {filteredPosts}
                            keyExtractor = {post => post.id.toString()}
                            renderItem= {({item})=>
                                <Post dataItem = {item}></Post>}
                        />
                        : <Text>Lo siento, este usuario aun no hizo un posteo</Text>
                    : <Text> Ese usuario no existe</Text>  
                } 
                </> }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2e9e4",
        color: "#ff9f68",
    },
    header: {
        backgroundColor: "#22223b",
        width: '100%',
        padding: 10,
    },
    field: {
        width: "90%",
        backgroundColor: "#C9ADA7",
        color: "black",
        textAlign: 'center',
        padding: 7,
        marginTop: 5,
        borderRadius: 5,
    },
    flatlist: {
        overflow: "hidden",
        width: "100%",
    },
    text: {
        color: "white",
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 600,
    },  
})
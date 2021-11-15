import React, { Component }  from "react";
import { Text, View, StyleSheet, ActivityIndicator, TextInput} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class Home extends Component{
    constructor (props){
        super(props);
        this.state = {
            posts: [],
            loaderPost: true,
            searchInput: ""
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
        let filteredPosts = this.state.searchInput.length > 0
            ? this.state.posts.filter(element => element.data.owner.includes(this.state.searchInput)) 
            : this.state.posts
        
        

        return(
            <View style={styles.container}>
                  {this.props.loader || this.state.loaderPost? (
                      <ActivityIndicator size='large' color='blue'/>
                  ): 
                <>
                <Text> ¡Hola {auth.currentUser.displayName}!</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Buscar usuario..."
                    onChangeText={text => this.setState({searchInput: text})}
                />
                {filteredPosts.length > 0 ?
                    
                    <FlatList
                        data = {filteredPosts}
                        keyExtractor = {post => post.id.toString()}
                        renderItem= {({item})=>
                            <Post dataItem = {item}></Post>}
                    />:
                    <Text>Lo siento, prueba con otro usuario</Text>
                
                }
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
    },
    field: {
        width: '80%',
        backgroundColor: "#09009B",
        color: '#FFA400',
        padding: 10,
        marginVertical: 10
    },
})
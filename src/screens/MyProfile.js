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
                <Text>Usuario: {auth.currentUser.username}</Text> {/* NO LEE USERNAME */}
                <Text>E-mail: {auth.currentUser.email}</Text>
                <Text>Última fecha de ingreso: </Text> {/* AGREGAR FECHA ULT DE INGRESO */}
                <Text>Publicaciones: </Text> {/* AGREGAR CANTIDAD DE POSTEOS */}
                <TouchableOpacity style = {styles.button} onPress={()=> this.props.handleLogout()}>
                    <Text style = {styles.text}> Cerrar sesión </Text>
                </TouchableOpacity>
                <FlatList
                    data = {this.state.posts}
                    keyExtractor = {post => post.id.toString()}
                    renderItem= {({item})=>
                    <Post item = {item}></Post>}
                /> {/* FILTRAR SOLO MIS POSTEOS */}
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
        width: '100%',
        backgroundColor: "#0F00FF",
    },
    text: {
        color: '#FFA400',
        textAlign: 'center'
    }
})
import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, Modal} from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase'

export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            liked: false,
            likes: 0
        }
    } //Constructor

    componentDidMount(){
        if(this.props.dataItem){
            if(this.props.dataItem.data.likes.lenght !== 0){
                this.setState({
                    likes: this.props.dataItem.data.likes.length
                })
            } //IF
            if(this.props.dataItem.data.likes.includes(auth.currentUser.email)){
                this.setState({
                    liked:true
                })//para que no se olvide el like refrescar la página
            } // IF
        } //IF
    } //Component

    onLike(){
        const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)
        
        posteoActualizar.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: true,
                likes: this.state.likes + 1
            })
        })
    } //LIke

    onDislike(){
        const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)
        
        posteoActualizar.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: false,
                likes: this.state.likes - 1
            })
        })
    } // Dislike

    showModal(){
        console.log('Mostrando modal')
        this.setState({
            showModal: true,
        })
    } //Show modal

    render(){

        console.log(this.props.dataItem);
        return(
            <View stlye={styles.container}>
                <Text>{this.props.dataItem.data.description}</Text>
                <Text>{this.props.dataItem.data.createdAt}</Text>
                <Text>{this.props.dataItem.data.owner}</Text>
                <Text>Likes: {this.state.likes}</Text>
                {
                    !this.state.liked ?
                    <TouchableOpacity onPress = {()=> this.onLike()}>
                        <Text>
                            Like
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress = {()=> this.onDislike()}>
                        <Text>
                            Unlike
                        </Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={()=>{this.showModal()}}>
                    <Text>
                        Ver comentarios
                    </Text>
                </TouchableOpacity>
                {
                    this.state.showModal ?

                        <Modal 
                        animationType = "fade"
                        transparent = {false}
                        visible = {this.state.showModal}
                        style = {styles.modal}
                        >
                            <View style={styles.modalView}>
                                {/* Botón de cierre del modal */}
                                <TouchableOpacity style={styles.closeModal} onPress={()=>{this.closeModal()}}>
                                        <Text style={styles.modalText} >X</Text>
                                </TouchableOpacity>
                                <Text>
                                    Aquí también irán los comentarios!  
                                </Text>
                                <Text>
                                    Aquí también debe ir la posibilidad de agregar un comentario
                                </Text>
                            </View>

                        </Modal>
                        :
                        null
                }
            </View>
        )
    } //Render

} // Post

const styles = StyleSheet.create({
    image: {
        height: 200,
    
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    },
    
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop:2,
        marginBotom: 10,
        borderRadius: 4,
    },

    modalText:{
        fontWeight: 'bold',
        color:'#fff',
    },
    modalView:{
        backgroundColor: 'green',
        borderRadius: 10,
    },
    modal: {
        border: 'none',
    }
}) //Styles


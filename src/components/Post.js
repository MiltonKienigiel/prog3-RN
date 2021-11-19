import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { auth, db } from "../firebase/config";
import firebase from "firebase";
import Comments from "../components/Comments";
import { AutoFocus } from "expo-camera/build/Camera.types";
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likes: 0,
      showModal: false,
      filteredComments: this.props.dataItem.data.comments,
    };
  } //Constructor

  componentDidMount() {
    if (this.props.dataItem) {
      if (this.props.dataItem.data.likes.lenght !== 0) {
        this.setState({
          likes: this.props.dataItem.data.likes.length,
        });
      } //IF
      if (this.props.dataItem.data.likes.includes(auth.currentUser.email)) {
        this.setState({
          liked: true,
        }); //para que no se olvide el like refrescar la página
      } // IF
    } //IF
  } //Component

  onLike() {
    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

    posteoActualizar
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          liked: true,
          likes: this.state.likes + 1,
        });
      });
  } //LIke

  onDislike() {
    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

    posteoActualizar
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        this.setState({
          liked: false,
          likes: this.state.likes - 1,
        });
      });
  } // Dislike

  showModal() {
    this.setState({
      showModal: true,
    });
  } //Show modal

  closeModal() {
    this.setState({
      showModal: false,
    });
  } //Show modal

  deleteComment(deletedCommentId){

    let filteredComments = this.props.dataItem.data.comments.filter(element => element.id != deletedCommentId)
    this.setState({
      filteredComments: filteredComments
    })

    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

    posteoActualizar.update({
        comments: filteredComments
      })
    }

  render() {
    return (
      <View style={styles.container}>
        {this.props.dataItem.data.owner == auth.currentUser.displayName ? (
          <TouchableOpacity
            onPress={() =>
              this.props.deletePost(this.props.dataItem.data.createdAt)
            }
          >
            <Ionicons name="trash" size="20px" color="red" />
          </TouchableOpacity>
        ) : null}
          <Text style={styles.textLeft}>{this.props.dataItem.data.owner}</Text>
        <Image
          style={styles.image}
          source={{ uri: this.props.dataItem.data.photo }}
        />
        <Text style={styles.text}>{this.props.dataItem.data.description} {this.props.dataItem.data.createdAt}</Text>
        <Text style={styles.textLike}>Likes: {this.state.likes}
        {!this.state.liked ? (
          <TouchableOpacity  onPress={() => this.onLike()}>
             <Ionicons style={styles.heartIcon} name="heart-outline" size="20px" color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.onDislike()}>
             <Ionicons style={styles.heartIcon} name="heart" size="20px" color="red" />
          </TouchableOpacity>
        )}
        </Text>

        {this.state.showModal ? (
          <>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.closeModal();
              }}
            >
              <Text style={styles.text}>
                Ocultar comentarios ({this.props.dataItem.data.comments.length})
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.showModal}
              style={styles.modal}
            >
              <Comments
                comments={this.props.dataItem.data.comments}
                closeModal={() => this.closeModal()}
                postId={this.props.dataItem.id}
                deleteComment={(deletedCommentId) => this.deleteComment(deletedCommentId)}
                filteredComments={this.state.filteredComments}
              />
            </Modal>
          </>
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.showModal();
            }}
          >
            <Text style={styles.text}>
              Ver comentarios ({this.props.dataItem.data.comments.length})
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  } //Render
} // Post

const styles = StyleSheet.create({
  image: {
    height: 200,
    borderRadius:"12px"
  },
  heartIcon:{
  },
  container: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    padding: 10,
    margin: "auto",
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "rgba(0, 0, 0, 0.247)",
  },
  text: {
    color: "white",
    textAlign: "center",
    padding:"5px"
  },
  textLike:{
    color: "white",
    textAlign: "center",
    padding:"5px",
    
  },
  heartIcon:{
    paddingLeft:"10px"
  },
  textLeft:{
    textAlign:"left",
    color:"white",
    paddingBottom:"10px"
  },
  btn: {
    backgroundColor: "#ff1f5a",
    padding: 7,
    marginTop: 5,
    borderRadius: 10,
    width: "80%",
    margin: "auto",
  },
  closeModal: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#dc3545",
    marginTop: 2,
    marginBotom: 10,
    borderRadius: 4,
  },
  modalText: {
    fontWeight: "bold",
    color: "#000",
  },
  modalView: {
    backgroundColor: "orange",
    borderRadius: 10,
  },
  modal: {
    border: "none",
    width:"100%",
    marginTop:"10px"
  },
}); //Styles

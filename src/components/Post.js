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
      if (this.props.dataItem.data.likes.length !== 0) {
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
  } //Close modal

  deleteComment(deletedCommentId) {
    let filteredComments = this.props.dataItem.data.comments.filter(
      (element) => element.id != deletedCommentId
    );
    this.setState({
      filteredComments: filteredComments,
    });

    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

    posteoActualizar.update({
      comments: filteredComments,
    });
  }

  deletePost() {
    let confirmDelete = confirm("¿Estás seguro de que querés eliminar esta publicación?")
    
    if (confirmDelete){
      db.collection("posts").doc(this.props.dataItem.id).delete();
    }
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inline}>
          <Text style={styles.username}>{this.props.dataItem.data.owner}</Text>
          {this.props.dataItem.data.owner == auth.currentUser.displayName
            ? ( <TouchableOpacity onPress={() => this.deletePost()}>
                  <Ionicons name="trash" size="20px" color="red"/>
                </TouchableOpacity> )
            : null}
        </View>
        <Image
          style={styles.image}
          source={{ uri: this.props.dataItem.data.photo }}
        />
        <View style={styles.inlineNear}>
          <Text style={styles.username}>{this.props.dataItem.data.owner}</Text>
          <Text style={styles.text}>{this.props.dataItem.data.description}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.text}>{this.formatDate(this.props.dataItem.data.createdAt)}</Text>
          <Text style={styles.text}>
            {!this.state.liked ? (
              <TouchableOpacity onPress={() => this.onLike()}>
                <Ionicons
                  style={styles.heartIcon}
                  name="heart-outline"
                  size="20px"
                  color="red"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.onDislike()}>
                <Ionicons
                  style={styles.heartIcon}
                  name="heart"
                  size="20px"
                  color="red"
                />
              </TouchableOpacity>
            )}
            <Text style={styles.text}>{this.state.likes}</Text>
          </Text>

          {this.state.showModal ? (
            <>
              <TouchableOpacity
                style={styles.inline}
                onPress={() => {
                  this.closeModal();
                }}
              >
                {/* <Text style={styles.text}>
                  Ocultar comentarios ({this.props.dataItem.data.comments.length})
                </Text> */}
                <Ionicons
                  style={styles.heartIcon}
                  name="chatbubble-ellipses-outline"
                  size="20px"
                  color="white"
                />
                <Text style={styles.text}>{this.props.dataItem.data.comments.length}</Text>
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
                  deleteComment={(deletedCommentId) =>
                    this.deleteComment(deletedCommentId)
                  }
                  filteredComments={this.state.filteredComments}
                />
              </Modal>
            </>
          ) : (
            <TouchableOpacity
              style={styles.inline}
              onPress={() => {
                this.showModal();
              }}
            >
              {/* <Text style={styles.text}>
                Ver comentarios ({this.props.dataItem.data.comments.length})
              </Text> */}
              <Ionicons
                  style={styles.heartIcon}
                  name="chatbubble-ellipses-outline"
                  size="20px"
                  color="white"
                />
                <Text style={styles.text}>{this.props.dataItem.data.comments.length}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } //Render
} // Post

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: "12px",
  },
  inline: {
    flexWrap: 'wrap', 
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5px',
  },
  inlineNear: {
    flexWrap: 'wrap', 
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  text: {
    color: "white",
    textAlign: "center",
    padding: "5px",
  },
  heartIcon: {
    marginLeft: "10px",
  },
  username: {
    textAlign: "left",
    color: "white",
    fontWeight: 600,
    fontSize: '15px',
    padding: "5px",
  },
  modal: {
    border: "none",
    width: "100%",
    marginTop: "10px",
  },
}); //Styles

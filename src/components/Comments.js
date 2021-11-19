import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import { createNativeWrapper } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  } //Constructor

  onComment() {
    const posteoActualizar = db.collection("posts").doc(this.props.postId);

    if (this.state.comment == "") {
      alert("Por favor, escribí un comentario.");
    } else {
      posteoActualizar
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            id: Date.now(),
            email: auth.currentUser.email,
            owner: auth.currentUser.displayName,
            comment: this.state.comment,
          }),
        })
        .then(() => {
          this.setState({
            comment: "",
          });
        });
    } // else
  } // onComment

  render() {
    return (
      <View style={styles.modalView}>
        {this.props.comments.length != 0 ? (
          <FlatList
            data={this.props.comments}
            keyExtractor={(comment) => comment.id}
            renderItem={({ item }) => (
              <>
                <Text style={styles.comment}>
                  {item.owner}: {item.comment}
                </Text>
                {item.owner == auth.currentUser.displayName ? (
                  <TouchableOpacity
                    style={styles.closeModal}
                    onPress={() => {
                      this.props.deleteComment(item.id);
                    }}
                  >
                    <Ionicons name="trash" size="15px" color="red" />
                  </TouchableOpacity>
                ) : null}
              </>
            )}
          />
        ) : (
          <Text>Aún no hay comentarios.</Text>
        )}
        <TextInput
          keyboardType="default"
          placeholder="Comentario..."
          multiline={true}
          numberOfLines={2}
          onChangeText={(text) => this.setState({ comment: text })}
          value={this.state.comment}
        />
        <TouchableOpacity style={styles.btn} onPress={() => this.onComment()}>
          <Text style={styles.text}>Comentar</Text>
        </TouchableOpacity>
      </View>
    );
  } //Render
} // Post

const styles = StyleSheet.create({
  image: {
    height: 200,
  },
  container: {
    flex: 1,
    width: "100%",
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
  comment:{
    padding:"5px"
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "red",
    padding: 7,
    marginTop: 5,
    borderRadius: 15,
  },
  closeModal: {
    alignSelf: "flex-end",
    padding: 10,
    marginTop: 2,
    marginBotom: 10,
    borderRadius: 4,
  },
  modalText: {
    fontWeight: "bold",
    color: "#fff",
  },
  modalView: {
    backgroundColor: "orange",
    borderRadius: 10,
    width:"100%"
  },
  modal: {
    border: "none",
  },
}); //Styles

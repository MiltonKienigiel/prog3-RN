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

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  } //Constructor

  componentDidMount() {} //Component
  onComment() {
    const posteoActualizar = db.collection("posts").doc(this.props.postId);

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
  } //LIke
  render() {
    return (
      <View style={styles.modalView}>
        {/* Botón de cierre del modal */}
        <TouchableOpacity
          style={styles.closeModal}
          onPress={() => {
            this.props.closeModal();
          }}
        >
          <Text style={styles.modalText}>X</Text>
        </TouchableOpacity>
        <FlatList
          data={this.props.comments}
          keyExtractor={(comment) => comment.id}
          renderItem={({ item }) => (
            <Text>
              {item.owner}: {item.comment}
            </Text>
          )}
        />
        <TextInput
          keyboardType="default"
          placeholder="¿Que quieres comentar?"
          multiline={true}
          numberOfLines={2}
          onChangeText={(text) => this.setState({ comment: text })}
          value={this.state.comment}
        />
        <TouchableOpacity style={styles.btn} onPress={() => this.onComment()}>
          <Text>Submit</Text>
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
    width: "60%",
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
    backgroundColor: "#dc3545",
    marginTop: 2,
    marginBotom: 10,
    borderRadius: 4,
  },
  modalText: {
    fontWeight: "bold",
    color: "#fff",
  },
  modalView: {
    backgroundColor: "green",
    borderRadius: 10,
  },
  modal: {
    border: "none",
  },
}); //Styles

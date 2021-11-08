import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { auth, db } from "../firebase/config";
import MyCamera from "../screens/MyCamera";
export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.Camera;
    this.state = {
      comment: "",
      photo: "",
      showCamera: true,
    };
  } // Constructor

  handlePost() {
    db.collection("posts")
      .add({
        owner: auth.currentUser.displayName,
        description: this.state.comment,
        createdAt: Date.now(),
        likes: [],
        comments: [],
      })
      .then((response) => {
        console.log(response);
        alert("¡Posteo realizado!");
        this.setState({
          comment: "",
        });
        this.props.navigation.navigate("Home");
      }) //THEN
      .catch((error) => {
        alert("No se pudo crear tu publicación.");
      });
  } // Handle post

  render() {
    return (
      <View style={styles.container}>
        {this.state.showCamera ? (
          <MyCamera />
        ) : (
          <>
            <TextInput
              style={styles.field}
              keyboardType="default"
              placeholder="¿En qué estás pensando?"
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => this.setState({ comment: text })}
              value={this.state.comment}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handlePost()}
            >
              <Text style={styles.text}>Publicar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
} // Create Post

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    alignItems: "center",
  },
  field: {
    width: "80%",
    backgroundColor: "#09009B",
    color: "#FFA400",
    padding: 10,
    marginVertical: 10,
  },
  button: {
    width: "30%",
    backgroundColor: "#0F00FF",
  },
  text: {
    color: "#FFA400",
    textAlign: "center",
  },
});

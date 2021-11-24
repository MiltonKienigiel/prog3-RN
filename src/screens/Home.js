import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loaderPost: true,
    };
  } // Constructor

  componentDidMount() {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (docs) => {
          let postsAux = [];
          docs.forEach((doc) => {
            postsAux.push({
              id: doc.id,
              data: doc.data(),
            });
          }); // For each
          this.setState({
            posts: postsAux,
            loaderPost: false,
          });
        } // docs
      ); //Snapshot
  } //Component

  deletePost(param) {
    db.collection("posts")
      .where("createdAt", "==", param)
      .get()
      .then((data) => {
        data.forEach((doc) => doc.ref.delete());
        const postsFiltered = this.state.posts.filter(
          (post) => post.createdAt != param
        );
        this.setState({ posts: postsFiltered });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.loader || this.state.loaderPost ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.text}>
                ¡Hola {auth.currentUser.displayName}!
              </Text>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={styles.flatlist}
              data={this.state.posts}
              keyExtractor={(post) => post.id.toString()}
              renderItem={({ item }) =><Post dataItem={item}></Post>}
            />
          </>
        )}
      </View>
    );
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
  flatlist: {
    overflow: "hidden",
    width: "100%",
    flex: 9,
    flexDirection: 'column',
  },
  text: {
    color: "white",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 600,
  },
});

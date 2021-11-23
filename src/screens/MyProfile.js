import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  } // Constructor

  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.displayName)
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
          });
        } // docs
      ); //Snapshot
  } //Component

  addPostRedirect(){
    this.props.navigation.navigate("Publicar");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Usuario: {auth.currentUser.displayName}</Text>
        <Text style={styles.text}>E-mail: {auth.currentUser.email}</Text>
        <Text style={styles.text}>
          Última fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}
        </Text>
        <Text style={styles.text}>
          Publicaciones: {this.state.posts.length}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.handleLogout()}
        >
          <Text style={styles.text}> Cerrar sesión </Text>
        </TouchableOpacity>
        {this.state.posts.length > 0
          ? <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.flatlist}
          data={this.state.posts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item }) => <Post dataItem={item} />}
          />
          : <>
              <Text style={styles.text}>No tenés niguna publicación.</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.addPostRedirect()}
              >
                <Text style={styles.text}>¡Creá tu primer posteo!</Text>
              </TouchableOpacity>
            </>
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  field: {
    width: "90%",
    backgroundColor: "#09009B",
    color: "#FFA400",
    padding: 10,
    marginVertical: 10,
  },
  flatlist: {
    overflow: "hidden",
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "#0F00FF",
  },
  text: {
    color: "#FFA400",
    textAlign: "center",
  },
  image: {
    height: 200,
  },
  container: {
    overflow: "hidden",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e2a78",
    color: "#ff9f68",
    // backgroundImage: 'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)',
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
});

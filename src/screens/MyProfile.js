import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      showModal: false,
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.inline}>
            <Text style={styles.text}>{auth.currentUser.displayName}</Text>
            <TouchableOpacity
              onPress={() => this.props.handleLogout()}
            >
              <Ionicons
                style={styles.heartIcon}
                name="log-out-outline"
                size="20px"
                color="white"
              />
            </TouchableOpacity>
          
          {this.state.showModal ? (
            <>
              <TouchableOpacity
                style={styles.inline}
                onPress={() => {
                  this.closeModal();
                }}
              >
                <Ionicons
                  style={styles.heartIcon}
                  name="add-outline"
                  size="20px"
                  color="white"
                />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.showModal}
                style={styles.modal}
              >
                <Text style={styles.text}>E-mail: {auth.currentUser.email}</Text>
                <Text style={styles.text}>
                  Última fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}
                </Text>
                <Text style={styles.text}>
                  Publicaciones: {this.state.posts.length}
                </Text>
              </Modal>
            </>
          ) : (
            <TouchableOpacity
              style={styles.inline}
              onPress={() => {
                this.showModal();
              }}
            >
              <Ionicons
                  style={styles.heartIcon}
                  name="add-outline"
                  size="20px"
                  color="white"
              />
            </TouchableOpacity>
          )} 
          </View> {/* inline */}
        </View> {/* header */}
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
  inline: {
    flexWrap: 'wrap', 
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5px',
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
    color: "white",
    textAlign: "left",
  },
  modal: {
    border: "none",
    width: "100%",
    marginTop: "10px",
  },
});

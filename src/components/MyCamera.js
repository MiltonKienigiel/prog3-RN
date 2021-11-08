import { Camera } from "expo-camera";
import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { auth, db, storage } from "../firebase/config";
export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.Camera;
    this.state = {
      photo: null,
      permission: false,
    };
  } // Constructor

  componentDidMount() {
    Camera.requestCameraPermissionsAsync().then((response) => {
      console.log(response);
      this.setState({
        permission: response.granted,
      });
    });
  }

  takePicture() {
    if (!this.camera) return;
    this.camera.takePictureAsync().then((photo) => {
      this.setState({
        photo: photo.uri,
      });
    });
  }
  uploadImage() {
    fetch(this.state.photo)
      .then((res) => res.blob())
      .then((image) => {
        const ref = storage.ref(`camera/${Date.now()}.jpg`);
        ref.put(image).then(() => {
          ref.getDownloadURL().then((url) => {
            console.log(url);
            this.setState({
              photo: "",
            });
            this.props.onImageUpload(url);
          });
        });
      });
  }

  onReject() {
    this.setState({
      photo: "",
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.photo ? (
          <>
            <Image style={styles.preview} source={{ uri: this.state.photo }} />
            <TouchableOpacity onPress={() => this.onReject()}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.uploadImage()}>
              <Text>Subir</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.front || Camera.Constants.Type.back}
              ref={(ref) => (this.camera = ref)}
            />
            <TouchableOpacity
              style={styles.shootButton}
              onPress={() => this.takePicture()}
            >
              <Text>Shoot</Text>
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
    alignItems: "center",
    width: "100%",
  },
  preview: {
    flex: 1,
    width: "100%",
  },
  camera: {
    width: "100%",
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

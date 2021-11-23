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
import Ionicons from "react-native-vector-icons/Ionicons";

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
            <View style={styles.uploadImage}>
              <TouchableOpacity onPress={() => this.uploadImage()}>
                <Ionicons name="checkmark-circle-outline" size="50px" color="green"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onReject()}>
                <Ionicons name="close-circle-outline" size="50px" color="red"/>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.front || Camera.Constants.Type.back}
              ref={(ref) => (this.camera = ref)}
            />
            <TouchableOpacity style={styles.uploadImage} onPress={() => this.takePicture()}>
              <Ionicons
                name="aperture-outline"
                size="50px"
                color="white"
              />
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
    backgroundColor: '#001219',
  },
  uploadImage: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: '#001219',
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

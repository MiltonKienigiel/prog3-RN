import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { auth, db } from "../firebase/config";
import { NavigationContainer } from "@react-navigation/native";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      checkPassword: "",
      error: "",
      users: [],
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot(
      (docs) => {
        let usersAux = [];
        docs.forEach((doc) => {
          usersAux.push(doc.data());
        }); // For each
        this.setState({
          users: usersAux,
        });
      } // docs
    ); //Snapshot
    console.log(this.state.users);
  }

  validateUsername() {
    let filteredUsers = this.state.users.filter((user) => {
      return user.username == this.state.username;
    });
    if (filteredUsers.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  register() {
    if (
      this.state.email == "" &&
      this.state.password == "" &&
      this.state.username == ""
    ) {
      alert("Todos los campos son obligatorios.");
    } else if (!this.state.email.includes("@")) {
      alert("El formato de e-mail no es válido.");
    } else if (this.validateUsername()) {
      alert("Este nombre de usuario ya está en uso. Por favor, elija otro.");
    } else if (this.state.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
    } else if (this.state.password !== this.state.checkPassword) {
      alert("Por favor, repita la misma contraseña.");
    } else {
      this.props.handleRegister(
        this.state.email,
        this.state.password,
        this.state.username
      );
    }
  } // Register

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="E-mail"
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Nombre de usuario"
          onChangeText={(text) => this.setState({ username: text })}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Repetir contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ checkPassword: text })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.register()}
          disabled={
            this.state.email == "" ||
            this.state.password == "" ||
            this.state.username == ""
              ? true
              : false
          }
        >
          <Text style={styles.text}> Registrarme </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

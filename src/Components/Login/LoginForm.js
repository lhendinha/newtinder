import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
  StatusBar
} from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import {
  setUsuario,
  setEmail,
  setSenha,
  setUsuarios
} from "../../Actions/AuthActions";
import { db } from "../../Configs/Db";

let itemsRef = db.ref("/usuario");

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInput: "thelhent@live.com",
      passwordInput: "Hardwaretop2"
    };
  }

  componentWillMount = () => {
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      let keys = Object.keys(data);
      let items = Object.values(data);

      let dados = [];
      snapshot.forEach(data => {
        let usuarioDados = data.val();
        let key = data.key;

        dados = [
          ...dados,
          {
            id: key,
            ...usuarioDados
          }
        ];
      });

      this.props.setUsuarios(dados);
    });
  };

  validateForm = () => {
    const { emailInput, passwordInput } = this.state;

    if (!emailInput || !passwordInput) {
      Alert.alert(
        "Campo Vazio",
        "Por favor, preencha todos os campos",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );

      return false;
    }

    return true;
  };

  login = () => {
    const { emailInput, passwordInput } = this.state;

    const formValidated = this.validateForm();

    if (!formValidated) {
      return;
    }

    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(emailInput, passwordInput)
        .then(user => {
          this.props.setUsuario({
            userId: user.user.uid,
            email: user.user.email
          });

          this.props.navigation.navigate("CardItem");
        })
        .catch(() => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(emailInput, passwordInput)
            .then(() => {
              Alert.alert(
                "Usuário Criado",
                "Usuário registrado com sucesso, por favor, realize o login com suas credenciais",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
            })
            .catch(error => {
              let errorCode = error.code;
              let errorMessage = error.message;

              if (errorCode == "auth/weak-password") {
                Alert.alert(
                  "Senha Fraca",
                  "Escolha uma senha mais forte !",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false }
                );
              }
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={value => this.setState({ emailInput: value })}
          value={this.state.emailInput}
        />

        <TextInput
          style={styles.input}
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          placeholder="Senha"
          placeholderTextColor="rgba(225,225,225,0.7)"
          secureTextEntry
          onChangeText={value => this.setState({ passwordInput: value })}
          value={this.state.passwordInput}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.login()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  loginButton: {
    backgroundColor: "#2980b6",
    color: "#fff"
  }
});

const mapStateToProps = state => ({
  usuario: state.AuthReducers.usuario,
  email: state.AuthReducers.email,
  senha: state.AuthReducers.senha,
  usuarios: state.AuthReducers.usuarios
});

export default connect(
  mapStateToProps,
  {
    setUsuario,
    setEmail,
    setSenha,
    setUsuarios
  }
)(withNavigation(LoginForm));

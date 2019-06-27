import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
import _ from "lodash";

import {
  setUsuario,
  setEmail,
  setSenha,
  setUsuarios
} from "../../Actions/AuthActions";
import { DEVICE_SIZE } from "../../Configs/Configs";

import { db } from "../../Configs/Db";

let itemsRef = db.ref("/usuario");

class Card extends Component {
  state = {
    isMarked: false
  };

  buttonAction = item => {
    const { usuario } = this.props;
    const { isMarked } = this.state;

    var list = [];
    if (usuario.curtiu) {
      if (isMarked) usuario.curtiu.push(item.id);
      else usuario.curtiu = usuario.curtiu.filter(f => f != item.id);
    } else {
      if (isMarked) list.push(item.id);
      usuario.curtiu = list;
    }
    const id = this.props.usuario.id;
    const novoUsuario = { ...this.props.usuario };
    delete novoUsuario.id;
    itemsRef
      .child(id)
      .set(novoUsuario)
      .then(() => {
        if (isMarked && item.curtiu) {
          item.curtiu.map(c => {
            if (c == usuario.id) {
              alert("Voce teve um Match");
              const novoMatch = { ...item };
              list = [];
              list.push({
                visualizado: false,
                id: usuario.id
              });
              novoMatch.match = list;
              delete novoMatch.id;
              itemsRef.child(item.id).set(novoMatch);
            }
          });
        }
      })
      .catch(() => {
        this.setState({ isMarked: false });
      });
  };

  componentWillMount() {
    const { item, usuario } = this.props;
    if (usuario.curtiu) {
      usuario.curtiu.map(c => {
        if (c == item.id) {
          this.setState({ isMarked: true });
        }
      });
    }
  }

  render({ item } = this.props) {
    return (
      <View style={{ width: DEVICE_SIZE.width, height: "100%" }}>
        <View style={styles.container}>
          <View style={styles.image}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={{ uri: item.imagem }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState(
                  {
                    isMarked: !this.state.isMarked
                  },
                  () => this.buttonAction(item)
                );
              }}
              style={styles.actionButton(this.state.isMarked)}
            >
              <Text style={styles.buttonLabel(this.state.isMarked)}>
                {this.state.isMarked ? "Descurtir" : "Curtir"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <Text style={styles.labelTile}>{item.nome}</Text>
            <Text style={{ padding: 5 }}>{item.descricao}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#FFF"
  },
  image: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "#F9F9F9"
  },
  info: {
    height: 150,
    marginLeft: 15,
    marginRight: 15
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  labelTile: {
    fontSize: 22,
    fontWeight: "bold"
  },
  actionButton: status => ({
    position: "absolute",
    width: 100,
    height: 50,
    top: 15,
    right: 10,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: status ? "#e74c3c" : "#FFF"
  }),
  buttonLabel: status => ({
    fontSize: 18,
    fontWeight: "bold",
    color: status ? "#FFF" : "#2c3e50"
  })
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
)(Card);

import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import { setUsuario, setEmail, setSenha } from "../../Actions/AuthActions";

import Card from "./Card";
import { db } from "../../Configs/Db";
import Routes from "../../routes";

let itemsRef = db.ref("/usuario");

const Button = ({ action, text } = this.props) => (
  <TouchableOpacity onPress={action} activeOpacity={0.7} style={styles.button}>
    <View style={styles.buttonContent}>
      <Text style={styles.label}>{text}</Text>
    </View>
  </TouchableOpacity>
);

class CardItem extends Component {
  state = {
    data: [],
    currentPosition: 0
  };

  componentWillMount = () => {
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      let current = this.props.usuario;

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

      let id = "";
      if (current.userId) id = current.userId;
      else id = current.id;

      current = dados.filter(f => f.id == id)[0];

      if (current.match) {
        current.match.map(m => {
          if (!m.visualizado) {
            let match = dados.filter(f => f.id == m.id);
            alert("Voce teve um match com " + match.nome[0]);
          }
        });
      }

      this.props.setUsuario(current);

      dados = dados.filter(f => f.id != current.id);

      this.setState({ data: dados });
    });
  };

  _handleChangeScrollPosition = position => {
    let data = this.state.data.length;
    if (position > -1 && position < data) {
      this.setState({ currentPosition: position });
      this.flatList.scrollToIndex({ animated: true, index: position });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={flatList => (this.flatList = flatList)}
          data={this.state.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          pagingEnabled
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Card item={item} />}
        />
        <View style={styles.actionContainer}>
          <Button
            text={"<"}
            action={() =>
              this._handleChangeScrollPosition(this.state.currentPosition - 1)
            }
          />
          <View />
          <Button
            text={">"}
            action={() =>
              this._handleChangeScrollPosition(this.state.currentPosition + 1)
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2ecc71"
  },
  actionContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    margin: 15,
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: "#FFF",
    elevation: 2,
    transform: [
      {
        rotate: "45deg"
      }
    ]
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [
      {
        rotate: "-45deg"
      }
    ]
  },
  label: {
    marginTop: -5,
    fontSize: 50,
    color: "#2ecc71"
  }
});

const mapStateToProps = state => ({
  usuario: state.AuthReducers.usuario,
  email: state.AuthReducers.email,
  senha: state.AuthReducers.senha
});

export default connect(
  mapStateToProps,
  {
    setUsuario,
    setEmail,
    setSenha
  }
)(CardItem);

import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import Login from "./Components/Login";
import CardItem from "./Components/Card";

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

const UserStack = createStackNavigator({
  CardItem: {
    screen: CardItem,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

const Navegador = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      User: UserStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);

export default () => <Navegador />;

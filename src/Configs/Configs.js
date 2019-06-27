import { Dimensions } from "react-native";

export const DEVICE_SIZE = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

export const FIREBASE_CONFIG = {
  databaseURL: "https://newtinder-4bfb6.firebaseio.com/",
  projectId: "newtinder-4bfb6"
};

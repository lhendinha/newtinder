import {
  SUCESSO_LOGIN,
  SET_EMAIL,
  SET_SENHA,
  SET_USUARIOS
} from "../Actions/types";

const INITIAL_STATE = {
  email: "",
  senha: "",
  usuario: null,
  usuarios: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCESSO_LOGIN:
      return {
        ...state,
        usuario: action.payload
      };

    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };

    case SET_SENHA:
      return {
        ...state,
        senha: action.payload
      };

    case SET_USUARIOS:
      return {
        ...state,
        usuarios: action.payload
      };

    default:
      return state;
  }
};

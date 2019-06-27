import { SET_EMAIL, SET_SENHA, SUCESSO_LOGIN, SET_USUARIOS } from "./types.js";

export const setEmail = email => {
  return {
    type: SET_EMAIL,
    payload: email
  };
};

export const setSenha = senha => {
  return {
    type: SET_SENHA,
    payload: senha
  };
};

export const setUsuario = usuario => {
  return {
    type: SUCESSO_LOGIN,
    payload: usuario
  };
};

export const setUsuarios = usuarios => {
  return {
    type: SET_USUARIOS,
    payload: usuarios
  };
};

import fire from "../firebase";
import { getProducts } from "./products";
import { getProperties } from "./property";

const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};
export const setError = (error) => {
  return {
    type: "SET_ERROR",
    payload: error,
  };
};

export const logIn = (email, password) => (dispatch) => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      dispatch(setUser(res.email));
      dispatch(setError(null));
    })
    .catch((err) => {
      switch (err.code) {
        case "auth/user-not-found":
          dispatch(setError("Пользователь не найден"));
          break;
        case "auth/user-disabled":
          dispatch(setError("Пользователь заблокирован"));
          break;
        case "auth/invalid-email":
          dispatch(setError("Не верный e-mail"));
          break;
        default:
          return dispatch(setError(err.message));
      }
    });
};

export const signUp = (email, password) => (dispatch) => {
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(setError(null));
    })
    .catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
          dispatch(setError("Этот электронный адрес уже занят"));
          break;
        case "auth/invalid-email":
          dispatch(setError("неверный адрес электронной почты"));
          break;
        case "auth/weak-password":
          dispatch(setError("легкий пароль"));
          break;
        default:
          return dispatch(setError(err.message));
      }
    });
};

export const signOut = () => (dispatch) => {
  fire
    .auth()
    .signOut()
    .then(() => {
      dispatch(setUser(null));
    });
};

export const getUser = () => (dispatch) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUser(user));
      dispatch(getProducts());
      dispatch(getProperties());
    } else {
      dispatch(setUser(null));
    }
  });
};

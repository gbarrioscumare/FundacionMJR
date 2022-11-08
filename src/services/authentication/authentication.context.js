import React, { useState, createContext } from "react";
import * as firebase from "firebase";
//import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";

import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = firebase.auth;
  const firestore = firebase.firestore;

  const [values, setValues] = useState({
    name: "",
    role: "",
    email: "",
    pwd: "",
    pwd2: ""
})

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  function handleChange(text, eventName) {
    setValues(prev => {
        return {
            ...prev,
            [eventName]: text
        }
    })
}
  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = () => {
    setIsLoading(true);
    const { email, pwd, pwd2, name, role } = values
    if (password !== repeatedPassword) {
      setError("Error: Las contraseñas no conciden");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
          firestore().collection("users").doc(auth().currentUser.uid).set({
              uid: auth().currentUser.uid,
              name,
              role,
              email
          })
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

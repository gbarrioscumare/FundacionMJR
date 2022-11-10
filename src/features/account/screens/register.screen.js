import React, { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native"
import * as firebase from "firebase";
import { ActivityIndicator, Colors } from "react-native-paper";

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";

import LoginScreen from "./login.screen"
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { handleChange } from "../../../services/authentication/authentication.context"
import TextBox from "./TextBox"
import Btn from "./Btn";
import "firebase/auth";
import "firebase/firestore";

const styles = StyleSheet.create({
  view: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
  }
})

export const RegisterScreen = ({ navigation }) => {
  const auth = firebase.auth;
  const firestore = firebase.firestore;




  const [values, setValues] = useState({
      name: "",
      role: "",
      email: "",
      pwd: "",
      pwd2: ""
  })

  function handleChange(text, eventName) {
      setValues(prev => {
          return {
              ...prev,
              [eventName]: text
          }
      })
  }

  function SignUp() {

      const { email, pwd, pwd2, name, role } = values

      if (pwd == pwd2) {
          auth().createUserWithEmailAndPassword(email, pwd)
              .then(() => {
                  firestore().collection("users").doc(auth().currentUser.uid).set({
                      uid: auth().currentUser.uid,
                      name,
                      role : "Usuario",
                      email
                  })
              })
              .catch((error) => {
                  alert(error.message)
                  // ..
              });
      } else {
          alert("Passwords are different!")
      }
  }

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Registrarse</Title>
      <View style={styles.view}>
        <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>Sign Up</Text>
        <TextBox placeholder="Nombre" onChangeText={text => handleChange(text, "name")} />
        <TextBox placeholder="Email" autoCapitalize="none" onChangeText={text => handleChange(text, "email")} />
        <TextBox placeholder="Password" secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd")}/>
        <TextBox placeholder="Confirme Password" secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd2")}/>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => SignUp("Registrer")} title="Sign Up" style={{ width: "48%" }} />
            <Btn onClick={() => navigation.replace("Login")} title="Login" style={{ width: "48%", backgroundColor: "#344869" }} />
        </View>
    </View>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Atras
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};

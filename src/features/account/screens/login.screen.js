import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native"

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";

import SignUpScreen from "./register.screen";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { handleChange } from "../../../services/authentication/authentication.context";
import TextBox from "./TextBox";
import Btn from "./Btn";
import firebase from 'firebase/app';
import "firebase/auth";

const styles = StyleSheet.create({
  view: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
  }
})

export const LoginScreen = ({ navigation }) => {
  const auth = firebase.auth;
  const firestore = firebase.firestore;
  const [values, setValues] = useState({
    email: "",
    pwd: ""
})

  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  function handleChange(text, eventName) {
    setValues(prev => {
        return {
            ...prev,
            [eventName]: text
        }
    })
} 
function Login() {

  const { email, pwd } = values

  firebase.auth().signInWithEmailAndPassword(email, pwd)
      .then(() => {
      })
      .catch((error) => {
          alert(error.message)
          // ..
      });
}


  return (
    <AccountBackground>
      <View style={styles.view}>
          <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>Login</Text>
          <TextBox placeholder="Email Address" onChangeText={text => handleChange(text, "email")} />
          <TextBox placeholder="Password" onChangeText={text => handleChange(text, "pwd")} secureTextEntry={true} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
              <Btn onClick={() => Login("Login")} title="Login" style={{ width: "48%" }} />
              <Btn onClick={() => navigation.navigate("Register")} title="Registrar" style={{ width: "48%", backgroundColor: "#344869" }} />
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

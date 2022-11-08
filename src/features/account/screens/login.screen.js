import React, { useState, useContext } from "react";
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
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { handleChange } from "../../../services/authentication/authentication.context";
import "firebase/auth";

export const LoginScreen = ({ navigation }) => {
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
      <AccountCover />
      <Title>Ingrese su mail y su contraseña</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => handleChange(text, "email")}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => handleChange({text, "pwd"})}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Ingresar
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Atras
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};

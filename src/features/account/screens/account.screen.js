import React from "react";
import LottieView from "lottie-react-native";
import { Image, StyleSheet } from "react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/account.styles";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 380,
    height: 230,
  },
});

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <Image
          style={styles.logo}
          source={require("../../../../assets/logo.png")}
        />
      </AnimationWrapper>
      <Title>Bienvenido/a a la Fundacion Maria Jose Reyes</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Ingresar
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Registrar
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};

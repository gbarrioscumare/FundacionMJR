import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import * as firebase from "firebase";


import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";

import {
   useFonts as useLato,
    Lato_400Regular,
} from "@expo-google-fonts/lato";

import {
  useFonts as useRobotoMono,
   RobotoMono_400Regular,
} from "@expo-google-fonts/roboto-mono";



import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyCz_f1IgcMlwTiczH_brzvjYcMZ12CSarw",
  authDomain: "proyectomjr.firebaseapp.com",
  projectId: "proyectomjr",
  storageBucket: "proyectomjr.appspot.com",
  messagingSenderId: "161941617094",
  appId: "1:161941617094:web:4dfb731ceac887237ddac7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  const [robotoMonoLoaded] = useRobotoMono({
    RobotoMono_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded || !robotoMonoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
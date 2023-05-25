import React, { useEffect, useState } from "react";
// import { View } from "react-native";

import RegistrationScreen from "./components/screens/RegistrationScreen";
import LoginScreen from "./components/screens/LoginScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [isFontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!isFontsLoaded) {
    return false;
  }

  return (
    <>
      {/* <RegistrationScreen></RegistrationScreen> */}
      <LoginScreen></LoginScreen>
    </>
  );
}

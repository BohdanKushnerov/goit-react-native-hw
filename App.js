import React, { createContext, useContext, useEffect, useState } from "react";

import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./services/router";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export default function App() {
  const [isFontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  const [isLogIn, setIsLogIn] = useState(false);

  const routing = useRoute(isLogIn);

  if (!isFontsLoaded) {
    return false;
  }

  return (
    <UserContext.Provider value={{ isLogIn, setIsLogIn }}>
      <NavigationContainer>{routing}</NavigationContainer>
    </UserContext.Provider>
  );
}

import React, { createContext, useContext, useState } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/Main";

// export const UserContext = createContext();
// export const useUser = () => useContext(UserContext);

export default function App() {
  const [isFontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  // const [isLogIn, setIsLogIn] = useState(false);

  if (!isFontsLoaded) {
    return false;
  }

  return (
    // <UserContext.Provider value={{ isLogIn, setIsLogIn }}>
    <Provider store={store}>
      <Main />
    </Provider>
    // </UserContext.Provider>
  );
}

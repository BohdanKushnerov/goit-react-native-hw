import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Dimensions,
  useWindowDimensions,
} from "react-native";

// import { useUser } from "../../App";

import { authSignInUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  // console.log(Platform.OS);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  // контекст
  // const { isLogIn, setIsLogIn } = useUser();

  const windowDimensions = useWindowDimensions();
  const { width: dimensionsWidth } = windowDimensions;

  useEffect(() => {
    const showSubBtns = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubBtns = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubBtns.remove();
      hideSubBtns.remove();
    };
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const register = () => {
    // if (state.email && state.password) {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(state);
    setState(initialState);
    dispatch(authSignInUser(state));

    // типа логин
    // setIsLogIn(true);
    // } else {
    //   console.log("Не все поля заполнены");
    // }
  };

  const emailHandleChangeText = (value) =>
    setState((prevState) => ({
      ...prevState,
      email: value,
    }));

  const passwordHandleChangeText = (value) =>
    setState((prevState) => ({
      ...prevState,
      password: value,
    }));

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={{
            ...styles.image,
            width: dimensionsWidth,
          }}
          source={require("../../assets/bcg-image.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 78,
                // width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Увійти</Text>
              </View>

              <View style={{ marginTop: 32 }}>
                <TextInput
                  placeholder="Адреса електронної пошти"
                  style={styles.input}
                  textAlign={"left"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={emailHandleChangeText}
                />
              </View>

              <View style={{ marginTop: 16, position: "relative" }}>
                <TextInput
                  placeholder="Пароль"
                  style={styles.input}
                  secureTextEntry={!passwordVisible}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={passwordHandleChangeText}
                />
                <Pressable
                  style={{ position: "absolute", top: 16, right: 16 }}
                  onPress={togglePasswordVisibility}
                >
                  <Text style={styles.passVisibility}>
                    {passwordVisible ? "Приховати" : "Показати"}
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  marginTop: 43,
                  marginBottom: isShowKeyboard ? -126 : 0,
                }}
              >
                <View>
                  <Pressable
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={register}
                  >
                    <Text style={styles.btnTitle}>Увійти</Text>
                  </Pressable>
                </View>
                <View style={{ marginTop: 16 }}>
                  <Pressable>
                    <Text
                      activeOpacity={0.8}
                      style={styles.alreadyHaveAccount}
                      onPress={() => navigation.navigate("Register")}
                    >
                      Немає акаунту? Зареєструватися
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  passVisibility: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    color: "#1B4371",
  },
  btn: {
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  alreadyHaveAccount: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});

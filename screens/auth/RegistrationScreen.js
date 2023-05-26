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
  Image,
  Dimensions,
} from "react-native";

import SvgForRegisterImg from "../../components/SvgForRegisterImg";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [state, setState] = useState(initialState);

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
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const loginHandleChangeText = (value) =>
    setState((prevState) => ({ ...prevState, login: value }));

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
          style={styles.image}
          source={require("../../assets/bcg-image.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 78,
              }}
            >
              <View style={styles.imageContainer}>
                <Image style={styles.registerImage} />
                <Pressable
                  style={{
                    ...styles.imageIcon,
                    // borderColor: image ? "#BDBDBD" : "#FF6C00",
                  }}
                  // onPress={() => {
                  //   if (!image) {
                  // навигация на камеру
                  //   } else {
                  //  то NULL
                  //   }
                  // }}
                >
                  <SvgForRegisterImg
                  // image={image}
                  />
                </Pressable>
              </View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Реєстрація</Text>
              </View>

              <View style={{ marginTop: 32 }}>
                <TextInput
                  placeholder="Логін"
                  style={styles.input}
                  textAlign={"left"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={loginHandleChangeText}
                />
              </View>

              <View style={{ marginTop: 16 }}>
                <TextInput
                  placeholder="Адреса електронної пошти"
                  style={styles.input}
                  textAlign={"left"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={emailHandleChangeText}
                />
              </View>

              <View style={{ position: "relative", marginTop: 16 }}>
                <TextInput
                  placeholder="Пароль"
                  style={styles.input}
                  secureTextEntry={!passwordVisible}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={passwordHandleChangeText}
                />
                <Pressable
                  activeOpacity={0.8}
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
                    <Text style={styles.btnTitle}>Зареєстуватися</Text>
                  </Pressable>
                </View>
                <View style={{ marginTop: 16 }}>
                  <Pressable
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.alreadyHaveAccount}>
                      Вже є акаунт? Увійти
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
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  imageContainer: {
    position: "absolute",
    flexDirection: "row",
    top: -60,
    right: "50%",
    transform: [{ translateX: 47 }],
  },
  registerImage: {
    borderRadius: 16,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
  },
  imageIcon: {
    position: "absolute",
    bottom: 12,
    right: -12,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
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

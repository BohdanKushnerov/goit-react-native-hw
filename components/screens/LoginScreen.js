import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  useEffect(() => {
    const showSubBtns = Keyboard.addListener("keyboardIsShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubBtns = Keyboard.addListener("keyboardIsHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubBtns.remove();
      hideSubBtns.remove();
    };
  }, []);

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
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Увійти</Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <TextInput
                  placeholder="Адреса електронної пошти"
                  style={styles.input}
                  textAlign={"left"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
              </View>

              <View style={{ marginTop: 20, position: "relative" }}>
                <TextInput
                  placeholder="Пароль"
                  style={styles.input}
                  secureTextEntry={!passwordVisible}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
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
              {!isShowKeyboard && (
                <View style={{ marginTop: 43 }}>
                  <View>
                    <Pressable
                      activeOpacity={0.8}
                      style={styles.btn}
                      onPress={keyboardHide}
                    >
                      <Text style={styles.btnTitle}>Увійти</Text>
                    </Pressable>
                  </View>
                  <View style={{ marginTop: 16 }}>
                    <Pressable>
                      <Text style={styles.alreadyHaveAccount}>
                        Немає акаунту? Зареєструватися
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
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
  },
  input: {
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    // paddingBottom: 78,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  passVisibility: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
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
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  alreadyHaveAccount: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});

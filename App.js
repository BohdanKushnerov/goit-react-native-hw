// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
} from "react-native";

export default function App() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/stars-photo.jpeg")}
        >
          {/* <View style={styles.innerBox}>
          <Text style={styles.text}>
            Open up App.js to start working on your appWWW!
          </Text>
          <StatusBar style="auto" />
        </View> */}
          <KeyboardAvoidingView
          // behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              // style={styles.form}
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 100,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Hello again</Text>
                <Text style={styles.headerTitle}>Welcome back</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>EMAIL ADDRESS</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              {/* <Button title="SIGN IN" /> */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                // onPress={() => setIsShowKeyboard(false)}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
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
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 40,
    borderRadius: 6,
    // marginHorizontal: 20,
    color: "#f0f0f0",
  },
  form: {
    marginHorizontal: 40,
    // marginBottom: 100,
  },
  inputTitle: {
    color: "#f0f0f0",
    marginBottom: 10,
    fontSize: 18,
  },
  btn: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      android: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      ios: {
        backgroundColor: "#4169e1",
        borderColor: "transparent",
      },
    }),

    // backgroundColor: Platform.OS === "android" ? "transparent" : "#4169e1",
    // borderColor: Platform.OS === "android" ? "#f0f0f0" : "transparent",
  },
  btnTitle: {
    color: Platform.OS === "android" ? "#4169e1" : "#f0f8ff",
    fontSize: 18,
  },
  header: {
    alignItems: "center",
    marginBottom: 150,
  },
  headerTitle: {
    fontSize: 30,
    color: "#f0f8ff",
  },
  // text: {
  //   color: "orangered",
  //   fontSize: 30,
  // },
  // innerBox: {
  //   borderWidth: 1,
  //   borderColor: "white",
  //   padding: 20,
  //   borderRadius: 10,
  // width: 300,
  // },
});

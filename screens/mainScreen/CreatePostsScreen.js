import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { Entypo, Feather } from "@expo/vector-icons";

export default function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image />
        <TouchableOpacity style={styles.iconContainer}>
          <Entypo name="camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerImgState}>
        <Text style={styles.imgState}>Завантажте фото</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputNameWrap}>
          <TextInput
            placeholder="Назва..."
            style={styles.inputName}
            placeholderTextColor={"#BDBDBD"}
            // onFocus={() => setIsShowKeyboard(true)}
            // value={state.password}
            // onChangeText={passwordHandleChangeText}
          />
        </View>
        <View style={styles.inputLocationWrap}>
          <TextInput
            placeholder="Місцевість..."
            style={styles.inputLocation}
            placeholderTextColor={"#BDBDBD"}
            // onFocus={() => setIsShowKeyboard(true)}
            // value={state.password}
            // onChangeText={passwordHandleChangeText}
          />
          <Feather
            style={{ position: "absolute", top: 13 }}
            name="map-pin"
            size={24}
            color="#BDBDBD"
          />
        </View>
        <View style={styles.btnWrap}>
          <Pressable
            activeOpacity={0.8}
            style={styles.btn}
            // onPress={register}
          >
            <Text style={styles.btnTitle}>Зареєстуватися</Text>
          </Pressable>
        </View>
        <View style={styles.deleteBtnWrap}>
          <TouchableOpacity
            style={styles.deleteBtn}
            // disabled={}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 8,
    width: "100%",
    height: 240,
    // backgroundColor: "#F6F6F6",
    backgroundColor: "black",
    borderRadius: 8,
  },
  iconContainer: {
    position: "absolute",
    top: "36%",
    left: "42%",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  containerImgState: {
    marginBottom: 32,
  },
  imgState: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  inputNameWrap: {
    marginBottom: 16,
  },
  inputName: {
    height: 50,

    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  inputLocationWrap: {
    position: "relative",
    marginBottom: 32,
  },
  inputLocation: {
    height: 50,
    paddingLeft: 28,

    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  btnWrap: {
    marginBottom: 120,
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
    // color: "#BDBDBD",
    color: "#FFFFFF",
  },
  deleteBtnWrap: {
    alignItems: "center",
  },
  deleteBtn: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

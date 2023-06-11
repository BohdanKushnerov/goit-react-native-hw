import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import { Entypo, Feather } from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { useIsFocused } from "@react-navigation/native";

import { db, storage, storageRef } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

console.log("storageRef", storageRef);

export default function CreatePostsScreen({ route: { params }, navigation }) {
  const [cameraPermission, setHasCameraPermission] = useState(null);
  // const [foregroundPermissions, setHasForegroundPermissions] = useState(null);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const isFocused = useIsFocused();

  const [location, setLocation] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const { userId, nickname } = useSelector((state) => state.auth);

  const titleHandleChangeText = (value) => setTitle(value);
  const addressHandleChangeText = (value) => setAddress(value);

  useEffect(() => {
    if (!params) return;
    setPhoto(params.photo);
    setLocation(params.location);
  }, [params]);

  // const sendPhoto = async () => {
  //   // uploadPhotoToStorage();
  //   await uploadPostToServer();
  //   // navigation.navigate("DefaultScreen", { photo, location, title, address });
  //   await navigation.navigate("DefaultScreen");
  // };
  const sendPhoto = () => {
    // uploadPhotoToStorage();
    uploadPostToServer();
    // navigation.navigate("DefaultScreen", { photo, location, title, address });
    navigation.navigate("DefaultScreen");
  };

  // ==========keyboard================

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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // =======================================

  const uploadPhotoToStorage = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);

    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToStorage();
    console.log(photo);

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userId,
        nickname,
        photo,
        location,
        title,
        address,
      });
      console.log("Document written: ", docRef);
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Image
            style={{
              // height: 200,
              // width: "100%",
              flex: 1,
              // backgroundColor: "gray",
            }}
            source={{ uri: photo }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CameraScreen", {
                fromScreen: "CreatePostsScreen",
              });
            }}
            style={styles.iconContainer}
          >
            <Entypo name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: isShowKeyboard ? 8 : 32 }}>
          <Text style={styles.imgState}>
            {photo ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </View>
        {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}> */}
        <View style={styles.form}>
          <View style={styles.inputNameWrap}>
            <TextInput
              placeholder="Назва..."
              style={styles.inputName}
              placeholderTextColor={"#BDBDBD"}
              onFocus={() => setIsShowKeyboard(true)}
              value={title}
              onChangeText={titleHandleChangeText}
            />
          </View>
          <View style={styles.inputLocationWrap}>
            <TextInput
              placeholder="Місцевість..."
              style={styles.inputLocation}
              placeholderTextColor={"#BDBDBD"}
              onFocus={() => setIsShowKeyboard(true)}
              value={address}
              onChangeText={addressHandleChangeText}
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
              onPress={sendPhoto}
            >
              <Text style={styles.btnTitle}>Опубліковати</Text>
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
        {/* </KeyboardAvoidingView> */}
      </View>
    </TouchableWithoutFeedback>
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
  cameraContainer: {
    position: "relative",
    marginBottom: 8,
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    // backgroundColor: "black",
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
  // containerImgState: {
  //   marginBottom: isShowKeyboard ? 16 : 32,
  // },
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
  //
  takePhotoContainer: {},
});

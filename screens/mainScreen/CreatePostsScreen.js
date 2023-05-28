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

export default function CreatePostsScreen({ navigation }) {
  const [cameraPermission, setHasCameraPermission] = useState(null);
  // const [foregroundPermissions, setHasForegroundPermissions] = useState(null);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const isFocused = useIsFocused();

  const [location, setLocation] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const titleHandleChangeText = (value) => setTitle(value);
  const addressHandleChangeText = (value) => setAddress(value);

  // console.log(title, address);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        setHasCameraPermission(status === "granted");
      })();
    }

    return () => {
      // console.log("Unmount CreatePostsScreen");
      setHasCameraPermission(null);
    };
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    // console.log(location.coords.latitude);
    // console.log(location.coords.longitude);

    setPhoto(photo.uri);
    setLocation(location.coords);
  };

  const sendPhoto = async () => {
    navigation.navigate("DefaultScreen", { photo, location, title, address });
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
    // console.log(1);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          {cameraPermission && (
            <Camera
              style={{
                height: 240,
              }}
              ref={setCamera}
            >
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image
                    style={{ height: 100, width: 150 }}
                    source={{ uri: photo }}
                  />
                </View>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainer}
                onPress={takePhoto}
              >
                <Entypo name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          )}
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
    // backgroundColor: "#F6F6F6",
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

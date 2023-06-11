import { Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export default function CameraScreen({ navigation, route: { params } }) {
  // console.log(params.fromScreen);
  // { navigation }
  const [cameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const isFocused = useIsFocused();

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
    // console.log(location);

    setPhoto(photo.uri);
    setLocation(location.coords);
  };

  const sendPhoto = async () => {
    // navigation.navigate("DefaultScreen", { photo, location, title, address });
    if (params.fromScreen === "CreatePostsScreen") {
      navigation.navigate("CreatePosts", { photo, location });
    }
    if (params.fromScreen === "RegistrationScreen") {
      navigation.navigate("Register", { photo });
    }
  };

  return (
    // <View style={styles.cameraContainer}>
    <View
      style={{
        // width: "100%",
        // height: "100%",
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      {cameraPermission && (
        <Camera
          style={{
            flex: 1,
          }}
          ref={setCamera}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconContainer}
            onPress={takePhoto}
          >
            <Entypo name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
      )}
      <View
        style={{
          height: 200,
          width: "100%",

          backgroundColor: "gray",
        }}
      >
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              style={{
                height: 200,
                width: "100%",
                // backgroundColor: "gray",
              }}
              source={{ uri: photo }}
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 50,
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={sendPhoto}
      >
        {/* <Entypo name="camera" size={24} color="#BDBDBD" /> */}
        <Text>{photo ? "Send photo" : "Make photo"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
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
});

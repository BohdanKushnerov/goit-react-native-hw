import { Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { authUpdateUserPhoto } from "../redux/auth/authOperations";
import { isOffTabBarOnSomeScreens } from "../redux/auth/authReducer";

export default function CameraScreen({ navigation, route: { params } }) {
  const [cameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        dispatch(isOffTabBarOnSomeScreens(true));

        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        setHasCameraPermission(status === "granted");
      })();
    }

    return () => {
      setHasCameraPermission(null);
      dispatch(isOffTabBarOnSomeScreens(false));
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

    setPhoto(photo.uri);
    setLocation(location.coords);
  };

  const sendPhoto = () => {
    if (params.fromScreen === "CreatePostsScreen") {
      navigation.navigate("CreatePosts", { photo, location });
    }
    if (params.fromScreen === "RegistrationScreen") {
      navigation.navigate("Register", { photo });
    }
    if (params.fromScreen === "ProfileScreen") {
      dispatch(authUpdateUserPhoto(photo));
      navigation.navigate("ProfileScreen");
    }
  };

  return (
    <View style={styles.cameraContainer}>
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
          backgroundColor: "#D0D0D0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {photo ? (
          <Image
            style={{
              height: 200,
              width: "100%",
            }}
            source={{ uri: photo }}
          />
        ) : (
          <Text>Here will be your photo</Text>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 50,
          // backgroundColor: "#FF6C00",
          backgroundColor: "orange",
          justifyContent: "center",
          alignItems: "center",
        }}
        disabled={!photo}
        onPress={sendPhoto}
      >
        <Text>{photo ? "Send photo" : "Make photo"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    position: "relative",
    paddingLeft: 15,
    paddingRight: 15,
    gap: 4,
    marginBottom: 4,
  },
  iconContainer: {
    position: "absolute",
    top: "85%",
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

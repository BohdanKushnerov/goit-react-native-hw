import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import LogOutBtn from "../../components/LogOutBtn";
import { useUser } from "../../App";
import SvgForRegisterImg from "../../components/SvgForRegisterImg";

import { Feather } from "@expo/vector-icons";
import ProfilePost from "../../components/ProfilePost";

export default function ProfileScreen() {
  const { isLogIn, setIsLogIn } = useUser();

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/bcg-image.jpg")}
      >
        <View style={styles.bcgProfile}>
          <View style={styles.imageProfileContainer}>
            <Image style={styles.profileImage} />
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
          <View style={styles.logOutBtn}>
            <LogOutBtn setIsLogIn={setIsLogIn} />
          </View>
          <Text style={styles.name}>Natali Romanova</Text>
          {/* ТУТ БУДЕ FLATLIST */}
          <ScrollView>
            <ProfilePost />
            <ProfilePost />
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingTop: 147,
  },
  imageProfileContainer: {
    position: "absolute",
    flexDirection: "row",
    top: -60,
    right: "50%",
    transform: [{ translateX: 47 }],
  },
  profileImage: {
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
  bcgProfile: {
    position: "relative",
    flex: 1,
    width: Dimensions.get("window").width,
    paddingTop: 24,
    paddingRight: 16,
    paddingLeft: 16,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  logOutBtn: {
    marginLeft: "auto",
    marginBottom: 46,
  },
  name: {
    marginBottom: 32,

    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
});

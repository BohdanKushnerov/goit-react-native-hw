import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import LogOutBtn from "../../components/LogOutBtn";
import SvgForRegisterImg from "../../components/SvgForRegisterImg";
import ProfilePost from "../../components/ProfilePost";

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FlatList } from "react-native";
import UserPost from "../../components/UserPost";

export default function ProfileScreen({ navigation }) {
  const [myPosts, setMyPosts] = useState([]);

  const { userId, nickname, photo } = useSelector((state) => state.auth);

  // const state = useSelector((state) => state.auth);
  // console.log(state);

  const getMyPosts = async () => {
    onSnapshot(
      query(collection(db, "posts"), where("userId", "==", userId)),
      (querySnapshot) => {
        const filteredPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMyPosts(filteredPosts);
      }
    );
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/bcg-image.jpg")}
      >
        <View style={styles.bcgProfile}>
          <View style={styles.imageProfileContainer}>
            <Image style={styles.profileImage} source={{ uri: photo }} />
            <Pressable
              style={{
                ...styles.imageIcon,
                borderColor: photo ? "#BDBDBD" : "#FF6C00",
              }}
              onPress={() => {
                navigation.navigate("CameraScreen", {
                  fromScreen: "ProfileScreen",
                });
              }}
            >
              <SvgForRegisterImg photo={photo} />
            </Pressable>
          </View>
          <View style={styles.logOutBtn}>
            <LogOutBtn />
          </View>
          <Text style={styles.name}>{nickname}</Text>
          {/* <Text>You don't have any posts</Text> */}
          <FlatList
            data={myPosts}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <UserPost
                image={{ uri: item.photo }}
                navigation={navigation}
                location={item.location}
                title={item.title}
                address={item.address}
                postId={item.id}
              />
            )}
          />
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

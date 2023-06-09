import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const UserPost = ({ image, navigation, location, title, address, postId }) => {
  const [commentQuantity, setCommentQuantity] = useState(0);

  const getQuantityComments = () => {
    onSnapshot(
      collection(db, "posts", `${postId}`, "comments"),
      (querySnapshot) => {
        console.log(querySnapshot.docs);
        setCommentQuantity(querySnapshot.docs.length);
      }
    );
  };

  useEffect(() => {
    getQuantityComments();
  }, [postId]);

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={styles.imageContainer}>
        <Image
          style={{
            width: "100%",
            height: 240,
            borderRadius: 8,
          }}
          source={image}
        />
      </View>
      <Text style={styles.imageTitle}>{title}</Text>
      <View style={styles.imageDetails}>
        <View style={styles.likesAndCommentsWrap}>
          <View style={styles.commentWrap}>
            <Pressable
              onPress={() =>
                navigation.navigate("CommentsScreen", { postId, image })
              }
            >
              <Feather name="message-circle" size={24} color="#FF6C00" />
            </Pressable>
            <Text style={styles.comments}>{commentQuantity}</Text>
          </View>
          {/* <View style={styles.likesWrap}>
            <Feather name="thumbs-up" size={22} color="#FF6C00" />
            <Text style={styles.likes}>153</Text>
          </View> */}
        </View>
        <View style={styles.countryWrap}>
          <Pressable
            onPress={() => navigation.navigate("MapScreen", { location })}
          >
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </Pressable>
          <Text style={styles.country}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserPost;

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 8,
  },
  imageTitle: {
    marginBottom: 8,

    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  imageDetails: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 24,
  },
  likesAndCommentsWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    gap: 24,
  },
  likesWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    gap: 8,
  },
  likes: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  comments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  countryWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
  country: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
  },
});

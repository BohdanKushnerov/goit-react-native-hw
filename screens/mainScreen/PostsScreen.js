import React from "react";
import { Image, Pressable } from "react-native";
import { Text, View, StyleSheet } from "react-native";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.profileImage} />
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImage: {
    borderRadius: 16,
    width: 60,
    height: 60,
    // backgroundColor: "#F6F6F6",
    backgroundColor: "black",
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});

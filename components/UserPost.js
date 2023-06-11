import { Feather } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native";

const UserPost = ({ image, navigation, location, title, address, postId }) => {
  // console.log("image", image);
  // console.log("UserPostlocation", location);
  // console.log(id);

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
        <View style={styles.likesWrap}>
          <Pressable
            onPress={() => navigation.navigate("CommentsScreen", { postId })}
          >
            <Feather name="message-circle" size={24} color="#FF6C00" />
          </Pressable>
          <Text style={styles.likes}>8</Text>
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

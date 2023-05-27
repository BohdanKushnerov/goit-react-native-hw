import { Feather } from "@expo/vector-icons";
import { Dimensions, Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";

const Post = () => {
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={styles.imageContainer}>
        <Image />
      </View>
      <Text style={styles.imageTitle}>Ліс</Text>
      <View style={styles.imageDetails}>
        <View style={styles.likesAndCommentsWrap}>
          <View style={styles.likesWrap}>
            <Feather name="message-circle" size={24} color="#FF6C00" />
            <Text style={styles.likes}>8</Text>
          </View>
          <View style={styles.commentWrap}>
            <Feather name="thumbs-up" size={22} color="#FF6C00" />
            <Text style={styles.comments}>153</Text>
          </View>
        </View>
        <View style={styles.countryWrap}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={styles.country}>Ukraine</Text>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 8,

    borderRadius: 8,
    backgroundColor: "black",
    width: "100%",
    height: 240,
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

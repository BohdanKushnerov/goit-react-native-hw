import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Text, View, StyleSheet, FlatList } from "react-native";
import UserPost from "../../components/UserPost";

export default function DefaultScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  // const [location, setLocation] = useState({});

  useEffect(() => {
    if (!route.params) return;
    setPosts((prevState) => [...prevState, route.params]);
    // setPosts((prevState) => [...prevState, route.params.photo]);
  }, [route.params]);

  // console.log(posts);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.profileImage} />
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <View style={{ width: "100%", marginBottom: 70 }}>
        <FlatList
          data={posts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <UserPost
              image={{ uri: item.photo }}
              navigation={navigation}
              location={item.location}
              title={item.title}
              address={item.address}
            />
          )}
        />
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
    marginBottom: 32,
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

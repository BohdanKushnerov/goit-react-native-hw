import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { db } from "../../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSelector } from "react-redux";
import UserPost from "../../components/UserPost";

export default function DefaultScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  // console.log("posts", posts);

  const { nickname, email, photo } = useSelector((state) => state.auth);

  useEffect(() => {
    const queryParams = query(collection(db, "posts"), orderBy("date", "desc"));

    const unsubscribe = onSnapshot(queryParams, (querySnapshot) => {
      // console.log(querySnapshot.docs);
      const arr = querySnapshot.docs.map((doc) => {
        // console.log("doc", doc.data());
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      setPosts([...arr]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.profileImage} source={{ uri: photo }} />
        <View>
          <Text style={styles.name}>{nickname}</Text>
          <Text style={styles.email}>{email}</Text>
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
              postId={item.id}
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
    backgroundColor: "gray",
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

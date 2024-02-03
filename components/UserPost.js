import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import formatDateTime from "../utils/formatDateTime";
import { FontAwesome } from "@expo/vector-icons";

const UserPost = ({ image, navigation, location, title, address, postId }) => {
  const [commentQuantity, setCommentQuantity] = useState(0);
  const [likedQuantity, setLikedQuantity] = useState(0);
  const [likedByMe, setLikedByMe] = useState(false);

  const userId = auth.currentUser.uid;

  useEffect(() => {
    const postRef = doc(db, "posts", `${postId}`);
    const likesCollectionRef = collection(postRef, "likes");

    const fetchLikedByMe = async () => {
      try {
        // Проверяем, существует ли уже лайк от этого пользователя
        const q = query(likesCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Если лайк уже существует
          setLikedByMe(true);
        }
      } catch (error) {
        console.error("Ошибка при проверке наличия лайка:", error);
      }
    };

    fetchLikedByMe();

    const unsubscribe = onSnapshot(likesCollectionRef, (querySnapshot) => {
      const likesCount = querySnapshot.size;
      setLikedQuantity(likesCount);
    });

    return () => {
      unsubscribe();
    };
  }, [postId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", `${postId}`, "comments"),
      (querySnapshot) => {
        // console.log(querySnapshot.docs);
        setCommentQuantity(querySnapshot.docs.length);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const likePost = async (postId, userId) => {
    const now = new Date();
    const formattedDateTime = formatDateTime(now);

    const postRef = doc(db, "posts", `${postId}`);
    const likesCollectionRef = collection(postRef, "likes");

    try {
      // Проверяем, существует ли уже лайк от этого пользователя
      const q = query(likesCollectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Если лайк уже существует, удаляем его
        const docId = querySnapshot.docs[0].id;
        await deleteDoc(doc(likesCollectionRef, docId));
        console.log("Лайк удален успешно!");
        setLikedByMe(false);
      } else {
        // Если лайка нет, добавляем новый лайк
        await addDoc(likesCollectionRef, {
          userId,
          date: formattedDateTime,
        });
        console.log("Лайк добавлен успешно!");
        setLikedByMe(true);
      }
    } catch (error) {
      console.error("Ошибка при добавлении/удалении лайка:", error);
    }
  };

  // useEffect(() => {
  //   getQuantityComments();
  // }, [postId]);

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
          <Pressable
            style={styles.commentWrap}
            onPress={() =>
              navigation.navigate("CommentsScreen", { postId, image })
            }
          >
            <Feather name="message-circle" size={24} color="#FF6C00" />
            <Text style={styles.comments}>{commentQuantity}</Text>
          </Pressable>
          <Pressable
            style={styles.likesWrap}
            onPress={() => likePost(postId, userId)}
          >
            {/* <Feather name="thumbs-up" size={22} color="#FF6C00" /> */}
            {likedByMe ? (
              <FontAwesome name="thumbs-up" size={24} color="#FF6C00" />
            ) : (
              <FontAwesome name="thumbs-o-up" size={24} color="#FF6C00" />
            )}
            <Text style={styles.likes}>{likedQuantity}</Text>
          </Pressable>
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
    justifyContent: "center",
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

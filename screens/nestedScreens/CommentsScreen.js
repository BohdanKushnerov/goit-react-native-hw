import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateIsCommentOrMapScreen } from "../../redux/auth/authReducer";

import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

function formatDateTime(date) {
  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDateTime = `${day} ${month}, ${year} | ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return formattedDateTime;
}

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [storageComments, setStorageComments] = useState([]);

  const dispatch = useDispatch();

  const { nickname } = useSelector((state) => state.auth);
  const { postId, image } = route.params;

  const createComment = async () => {
    const now = new Date();
    const formattedDateTime = formatDateTime(now);

    const postRef = doc(db, "posts", `${postId}`);
    const commentCollectionRef = collection(postRef, "comment");

    try {
      const newCommentRef = await addDoc(commentCollectionRef, {
        comment,
        nickname,
        date: formattedDateTime,
      });
      // console.log("New comment added: ", newCommentRef);
      setComment("");
      keyboardHide();
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const getAllComments = () => {
    onSnapshot(
      collection(db, "posts", `${postId}`, "comment"),
      (querySnapshot) => {
        setStorageComments(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
  };

  useEffect(() => {
    dispatch(updateIsCommentOrMapScreen(true));
    getAllComments();

    return () => {
      dispatch(updateIsCommentOrMapScreen(false));
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <Image style={styles.mainPhoto} source={image} />
      </TouchableWithoutFeedback>
      <FlatList
        data={storageComments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              ...styles.commentContainer,
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            }}
          >
            <Image style={styles.commentProfileImage} />
            <View
              style={{
                width: "89%",
                padding: 16,
                backgroundColor: "#F7F7F7",
                borderTopLeftRadius: index % 2 === 0 ? 0 : 6,
                borderTopRightRadius: index % 2 === 0 ? 6 : 0,
                borderBottomRightRadius: 6,
                borderBottomLeftRadius: 6,
              }}
            >
              <Text style={styles.comment}>{item.comment}</Text>
              <Text
                style={{
                  ...styles.date,
                  marginRight: index % 2 === 0 ? 0 : "auto",
                }}
              >
                {item.date}
              </Text>
            </View>
          </View>
        )}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        <View
          style={{
            ...styles.inputContainer,
            marginBottom: isShowKeyboard ? 8 : 16,
          }}
        >
          <TextInput
            style={styles.input}
            value={comment}
            placeholder="Коментувати..."
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity
            style={styles.btn}
            disabled={!comment}
            onPress={() => createComment()}
          >
            <AntDesign name="arrowup" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
  },
  mainPhoto: {
    height: 240,
    backgroundColor: "black",
    marginBottom: 32,
    borderRadius: 5,
  },
  commentContainer: {
    gap: 16,
    marginBottom: 24,
  },
  commentProfileImage: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "black",
  },
  comment: {
    marginBottom: 4,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#212121",
    textAlign: "right",
    color: "#BDBDBD",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    height: 50,
    marginTop: 16,
  },
  input: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F6F6",

    paddingLeft: 16,
    paddingRight: 55,

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    fontSize: 16,
  },
  btn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

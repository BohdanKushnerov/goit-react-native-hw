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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateIsCommentOrMapScreen } from "../../redux/auth/authReducer";

import { addDoc, collection, doc } from "firebase/firestore";
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
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  const now = new Date();
  const formattedDateTime = formatDateTime(now);

  const dispatch = useDispatch();

  const { nickname } = useSelector((state) => state.auth);
  const { postId } = route.params;

  const createComment = async () => {
    const postRef = doc(db, "posts", `${postId}`);
    const commentCollectionRef = collection(postRef, "comment");

    try {
      const newCommentRef = await addDoc(commentCollectionRef, {
        comment,
        nickname,
      });
      console.log("New comment added: ", newCommentRef);
      setComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  useEffect(() => {
    dispatch(updateIsCommentOrMapScreen(true));

    return () => {
      dispatch(updateIsCommentOrMapScreen(false));
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 32 }}>
        <Image style={{ height: 240, backgroundColor: "black" }} />
      </View>
      {/* <View style={{ flexDirection: "row", gap: 16, marginBottom: 24 }}>
        <Image
          style={{
            width: 28,
            height: 28,
            borderRadius: 50,
            backgroundColor: "black",
          }}
        />
        <View style={{ width: "85%", padding: 16, backgroundColor: "#F7F7F7" }}>
          <Text style={styles.comment}>
            Really love your most recent photo. I’ve been trying to capture the
            same thing for a few months and would love some tips!
          </Text>
          <Text style={styles.date}>{formattedDateTime}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <Image
          style={{
            width: 28,
            height: 28,
            borderRadius: 50,
            backgroundColor: "black",
          }}
        />
        <View style={{ width: "85%", padding: 16, backgroundColor: "#F7F7F7" }}>
          <Text style={styles.comment}>
            Really love your most recent photo. I’ve been trying to capture the
            same thing for a few months and would love some tips!
          </Text>
          <Text style={styles.date}>{formattedDateTime}</Text>
        </View>
      </View> */}
      {/* ================================================================ */}
      {/* <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {index % 2 === 0 ? (
              <Image
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 50,
                  backgroundColor: "black",
                }}
              />
            ) : null}
            <View
              style={{
                width: "85%",
                padding: 16,
                backgroundColor: "#F7F7F7",
              }}
            >
              <Text style={styles.comment}>{item.text}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            {index % 2 === 0 ? null : (
              <Image
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 50,
                  backgroundColor: "black",
                }}
              />
            )}
          </View>
        )}
      /> */}
      <View
        style={{
          ...styles.inputContainer,
          // временно пока не уберу ТАББАР
          marginTop: 16,
          marginBottom: keyboardIsShown ? 100 : 32,
        }}
      >
        <TextInput
          style={styles.input}
          value={comment}
          placeholder="Коментувати..."
          onFocus={() => setKeyboardIsShown(true)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    width: "100%",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    // alignItems: "center",
  },
  comment: {
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
  },
  input: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F6F6",

    paddingLeft: 16,

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

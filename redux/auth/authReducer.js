import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickname: null,
  stateChange: false,
  photo: null,
  isCommentOrMapScreen: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => {
      // console.log(payload);
      return {
        ...state,
        userId: payload.userId,
        nickname: payload.nickname,
        photo: payload.photo,
      };
    },
    updateIsCommentOrMapScreen: (state, { payload }) => {
      console.log("payload", payload);
      return {
        ...state,
        isCommentOrMapScreen: payload,
      };
    },
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
  },
});

export const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateIsCommentOrMapScreen,
} = authSlice.actions;

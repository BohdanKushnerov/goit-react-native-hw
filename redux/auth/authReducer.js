import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickname: null,
  email: null,
  stateChange: false,
  isCommentOrMapScreen: false,
  photo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => {
      return {
        ...state,
        userId: payload.userId,
        nickname: payload.nickname,
        email: payload.email,
        photo: payload.photo,
      };
    },
    updateUserPhoto: (state, { payload }) => {
      return {
        ...state,
        photo: payload.photo,
      };
    },
    updateIsCommentOrMapScreen: (state, { payload }) => {
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
  updateUserPhoto,
} = authSlice.actions;

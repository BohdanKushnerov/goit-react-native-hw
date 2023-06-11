import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickname: null,
  stateChange: false,
  photo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        userId: payload.userId,
        nickname: payload.nickname,
        photo: payload.photo,
      };
    },
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
      // stateChange: payload,
    }),
    authSignOut: () => initialState,
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

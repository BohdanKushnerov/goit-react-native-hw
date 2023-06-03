import { auth, db } from "../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./authReducer";

// console.log(authSlice);

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    // const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("login user", user);
        dispatch(
          updateUserProfile({ userId: user.uid, nickname: user.displayName })
        );
        // ...
        console.log("db", db);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error.message", error.message);
      });
  };
export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      // const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("register user", user);

      await updateProfile(auth.currentUser, {
        displayName: login,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      });

      const updatedUser = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: updatedUser.uid,
          nickname: updatedUser.displayName,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  console.log("в оператион");
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user есть");
      dispatch(
        updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    } else {
      // User is signed out
      // ...
    }
  });
};

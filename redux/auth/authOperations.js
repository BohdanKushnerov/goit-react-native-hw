import { auth, db, storage } from "../../firebase/config";
import {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateUserPhoto,
} from "./authReducer";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  ({ login, email, password, photo }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const uploadPhotoToStorage = async () => {
        const response = await fetch(photo);
        const file = await response.blob();
        const uniquePostId = Date.now().toString();
        const storageRef = ref(storage, `registerImage/${uniquePostId}`);

        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      };

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: await uploadPhotoToStorage(photo),
      });

      const updatedUser = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: updatedUser.uid,
          email: updatedUser.email,
          nickname: updatedUser.displayName,
          photo: updatedUser.photoURL,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const authUpdateUserPhoto = (photo) => async (dispatch, getState) => {
  try {
    const uploadPhotoToStorage = async () => {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const storageRef = ref(storage, `registerImage/${uniquePostId}`);

      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    };

    await updateProfile(auth.currentUser, {
      photoURL: await uploadPhotoToStorage(photo),
    });

    const updatedUser = auth.currentUser;

    dispatch(
      updateUserPhoto({
        photo: updatedUser.photoURL,
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
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          email: user.email,
          nickname: user.displayName,
          photo: user.photoURL,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    } else {
      // User is signed out
      // ...
    }
  });
};

import { auth, db, storage } from "../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./authReducer";

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
  ({ login, email, password, photo }) =>
  async (dispatch, getState) => {
    try {
      // const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

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

      console.log("updatedUser", updatedUser);

      await dispatch(
        updateUserProfile({
          userId: updatedUser.uid,
          nickname: updatedUser.displayName,
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
  // console.log("в оператион");
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log("user есть");
      dispatch(
        updateUserProfile({
          userId: user.uid,
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

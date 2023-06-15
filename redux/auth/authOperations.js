import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateUserPhoto,
} from "./authReducer";
import { uploadPhotoToStorage } from "../../firebase/utils/uploadPhototoStorage";

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          updateUserProfile({ userId: user.uid, nickname: user.displayName })
        );
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
      if (photo) {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: login,
          photoURL: await uploadPhotoToStorage(photo, "registerImage"),
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
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: login,
        });

        const updatedUser = auth.currentUser;

        dispatch(
          updateUserProfile({
            userId: updatedUser.uid,
            email: updatedUser.email,
            nickname: updatedUser.displayName,
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

export const authUpdateUserPhoto = (photo) => async (dispatch, getState) => {
  try {
    if (photo) {
      const photoURL = await uploadPhotoToStorage(photo, "registerImage");

      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });

      const updatedUser = auth.currentUser;

      dispatch(
        updateUserPhoto({
          photo: updatedUser.photoURL,
        })
      );
    }
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
    }
  });
};

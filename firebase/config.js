import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDESFnkGUj5xsWSGVWg_VP-1yQNXQI2xFI",
  authDomain: "rn-my-project-8682e.firebaseapp.com",
  projectId: "rn-my-project-8682e",
  storageBucket: "rn-my-project-8682e.appspot.com",
  messagingSenderId: "403441056414",
  appId: "1:403441056414:web:dbbbbd5408fd797259d98f",
  measurementId: "G-Z9GD8Q6TZS",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);

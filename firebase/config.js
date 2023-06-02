// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

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

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

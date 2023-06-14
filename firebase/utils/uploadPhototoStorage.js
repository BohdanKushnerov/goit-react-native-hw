import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config";

export const uploadPhotoToStorage = async (photo, url) => {
  console.log(2);
  const response = await fetch(photo);
  // console.log("response", response);
  const file = await response.blob();
  const uniquePostId = Date.now().toString();
  // console.log("uniquePostId", uniquePostId);
  // const storageRef = ref(storage, `registerImage/${uniquePostId}`);
  const storageRef = ref(storage, `${url}/${uniquePostId}`);
  // console.log("storageRef", storageRef);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

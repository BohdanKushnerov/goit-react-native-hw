import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config";

export const uploadPhotoToStorage = async (photo, url) => {
  const response = await fetch(photo);
  const file = await response.blob();
  const uniquePostId = Date.now().toString();
  const storageRef = ref(storage, `${url}/${uniquePostId}`);

  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

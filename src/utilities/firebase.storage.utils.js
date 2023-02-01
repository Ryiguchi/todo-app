import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getUserUid } from "./firebase.store.utils";

import { app } from "./firebase.utils";

const storage = getStorage();

export const uploadImg = async (imgFile, uid) => {
  const picName = imgFile.name;
  const path = `userPics/${uid}/${picName}`;
  const userPicRef = ref(storage, path);
  try {
    await uploadBytes(userPicRef, imgFile);
    return await getDownloadURL(ref(storage, path));
  } catch (error) {
    throw new Error(error.code);
  }
};

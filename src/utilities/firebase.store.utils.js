import { app } from "./firebase.utils";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { getAuth } from "firebase/auth";

export const db = getFirestore();

export const getUserData = async (user) => {
  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.data();
};

export const createUserDocumentFromAuth = async (user, name = null) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = user;
    let { displayName } = user;
    const createdAt = new Date();
    if (name) displayName = name;

    try {
      await setDoc(userDocRef, {
        displayName,
        imgData: {},
        email,
        createdAt,
        userOptions: {},
        lists: [],
      });
    } catch (error) {
      alert("There was an error creating your account!");
    }
  }
};

export const firebaseSaveLists = async (state) => {
  const auth = getAuth();
  if (!auth || !auth.currentUser) return;

  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      lists: state.lists,
    });
  } catch (error) {
    throw new Error(error.code);
  }
};

export const firebaseSaveUserOptions = async (userOptions) => {
  const auth = getAuth();
  if (!auth || !auth.currentUser) return;

  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      userOptions,
    });
  } catch (error) {
    throw new Error(error.code);
  }
};

export const firebaseChangeUserDisplayName = async (displayName) => {
  const auth = getAuth();
  if (!auth || !auth.currentUser) return;

  const userDocRef = doc(db, "users", auth.currentUser.uid);
  try {
    await updateDoc(userDocRef, {
      displayName,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const firebaseUpdateProfilePicture = async (imgData) => {
  const auth = getAuth();
  if (!auth || !auth.currentUser) return;

  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      imgData,
    });
  } catch (error) {
    throw new Error(error.code);
  }
};

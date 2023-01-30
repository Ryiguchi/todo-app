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

export const saveListsToFirebase = async (state) => {
  const auth = getAuth();
  if (!auth || !auth.currentUser) return;

  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      lists: state.lists,
    });
  } catch (error) {
    alert(error);
  }
};

export const saveUserOptionsToFirebase = async (userOptions) => {
  const auth = getAuth();
  if (!auth || !auth.currentUser) return;

  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      userOptions,
    });
  } catch (error) {
    console.log(error);
  }
};

export const changeUserDisplayName = async (displayName) => {
  console.log(displayName);
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

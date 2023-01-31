import { app } from "./firebase.utils";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "@firebase/auth";

import { createUserDocumentFromAuth } from "./firebase.store.utils";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    resolve(auth.currentUser);
    reject(error);
  });
};

export const signUpWithEmail = async (name, email, password) => {
  if (!email || !password) return;

  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    await createUserDocumentFromAuth(user, name);

    return user;
  } catch (error) {
    throw new Error(error.code);
  }
};

export const signInWithEmail = async (email, password) => {
  if (!email || !password) return;
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    return user;
  } catch (error) {
    throw new Error(error.code);
  }
};

export const googleSignIn = async () => {
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;
    await createUserDocumentFromAuth(user);
  } catch (error) {
    throw new Error(error.code);
  }
};

export const signOutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    alert("There was an error signing you out.  Try again!");
  }
};

export const sendResetEmail = async (email) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(error.code);
  }
};

export const reauthenticateUser = async (password) => {
  const auth = getAuth();
  const { currentUser } = auth;
  if (!currentUser) {
    throw new Error(
      "Can not authenticate user because the user is not signed in."
    );
  }
  const { email } = currentUser;
  const credential = EmailAuthProvider.credential(email, password);

  try {
    await reauthenticateWithCredential(currentUser, credential);
    return currentUser;
  } catch (error) {
    throw new Error(error.code);
  }
};

export const changeUserEmail = async (newEmail, currentUser) => {
  try {
    await updateEmail(currentUser, newEmail);
  } catch (error) {
    throw new Error(error.code);
  }
};

export const changeUserPassword = async (newPassword, currentUser) => {
  try {
    await updatePassword(currentUser, newPassword);
  } catch (error) {
    throw new Error(error.code);
  }
};

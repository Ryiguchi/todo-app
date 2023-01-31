import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsFA99NrLs7QQfEH6l24-iLpM_NpjVsDE",

  authDomain: "todo-95bfb.firebaseapp.com",

  projectId: "todo-95bfb",

  storageBucket: "todo-95bfb.appspot.com",

  messagingSenderId: "685856303303",

  appId: "1:685856303303:web:62616b64e10709c33af6e2",

  measurementId: "G-GVX6Z36G1E",

  storageBucket: "gs://todo-95bfb.appspot.com",
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

import { getStorage, ref } from "firebase/storage";

import { app } from "./firebase.utils";

const storage = getStorage();

const userPicsRef = ref(storage, "userPics");

import {
  getUserData,
  firebaseSaveLists,
  firebaseSaveUserOptions,
  firebaseChangeUserDisplayName,
  getUserUid,
  firebaseUpdateImgData,
} from "./utilities/firebase.store.utils";
import { uploadImg } from "./utilities/firebase.storage.utils";

export let state = {};

// Selectors
export const getListTitles = () => {
  return state.lists.map((list) => list.title);
};

export const selectPinnedLists = () => {
  return state.lists.filter((list) => list.pinned === true);
};

export const getListById = (id) => {
  return state.lists.reduce((acc, cur) => {
    if (cur.id === id) return cur;
    return acc;
  }, {});
};

// Helpers
const getListIndexById = (id) => {
  return state.lists.findIndex((list) => list.id === id);
};

//
export const clearCurrentUser = () => {
  state.currentUser = {};
  state.displayName = "";
  state.lists = [];
};

export const setUserState = async (user) => {
  if (!user) return;
  try {
    const userData = await getUserData(user);
    state.currentUser = user;
    state.displayName = userData?.displayName ?? user.email;
    state.userOptions = userData?.userOptions;
    state.lists = userData?.lists ?? [];
    state.imgData = userData?.imgData;
    return userData;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateList = (listData) => {
  const savedListIndex = state.lists.findIndex(
    (list) => list.id === listData.id
  );

  const updatedLists = [...state.lists];
  updatedLists.splice(savedListIndex, 1, listData);
  state = {
    ...state,
    lists: [...updatedLists],
  };

  firebaseSaveLists(state);
};

export const saveNewList = (listData) => {
  const id = Date.now().toString();
  listData.id = id;
  const newLists = [...state.lists, listData].flat();
  state = {
    ...state,
    lists: [...newLists],
  };

  firebaseSaveLists(state);

  return id;
};

export const deleteList = (id) => {
  const listToDeleteIndex = getListIndexById(id);
  const updatedList = [...state.lists];
  updatedList.splice(listToDeleteIndex, 1);
  state = {
    ...state,
    lists: [...updatedList],
  };

  firebaseSaveLists(state);
};

export const updateUserGridLayout = (numColumns) => {
  state = {
    ...state,
    userOptions: {
      ...state.userOptions,
      layout: numColumns,
    },
  };

  firebaseSaveUserOptions(state.userOptions);
};

export const changeUserDisplayName = async (newName) => {
  try {
    await firebaseChangeUserDisplayName(newName);
    state = {
      ...state,
      displayName: newName,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const request = {};

export const optimizeImg = async (url) => {
  try {
  } catch (error) {}
};

export const updateProfilePicture = async (imgData, imgFile) => {
  try {
    await firebaseUpdateImgData(imgData);
    state = {
      ...state,
      imgData,
      imgFile,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const setUploadedImgUrlToState = async (imgFile) => {
  try {
    const userUid = getUserUid();
    const imgUrl = await uploadImg(imgFile, userUid);
    const imgData = {
      ...state.imgData,
      url: imgUrl,
    };
    await firebaseUpdateImgData(imgData);
    state = {
      ...state,
      imgData,
    };
  } catch (error) {
    throw new Error(error);
  }
};

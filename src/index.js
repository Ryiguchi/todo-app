"use strict";

import headerView from "./views/headerView.js";
import todoView from "./views/todoView.js";
import signInView from "./views/signInView.js";
import signUpView from "./views/signUpView.js";
import forgotPassView from "./views/forgotPassView.js";
import * as model from "./model.js";
import * as fireAuth from "./utilities/firebase.auth.utils.js";
import * as firestore from "./utilities/firebase.store.utils.js";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const controlLogInBtn = () => {
  todoView.hideTodoView();
  signInView.showAuthSection();
};

const controlLogOutBtn = async () => {
  const auth = getAuth();
  if (!auth.currentUser) return;

  try {
    await fireAuth.signOutUser();
    model.clearCurrentUser();
    headerView.clearUserName();
    headerView.showLogInBtn();
    headerView.clearMyLists();
    todoView.clearTodoLists();
  } catch (error) {
    headerView.signOutMessage("error", error);
  }
};

const controlCloseSection = () => {
  signInView.hideSection();
  forgotPassView.hideSection();
  todoView.showTodoView();
};

const signInSuccess = async () => {
  await manageCurrentUser();
  signInView.hideSection();
  todoView.showTodoView();
};

const controlSignUp = async (name, email, password) => {
  try {
    await fireAuth.signUpWithEmail(name, email, password);
    await signInSuccess();
  } catch (error) {
    signUpView.showSignUpMessage("error", error);
  }
};

const controlSignIn = async (email, password) => {
  try {
    await fireAuth.signInWithEmail(email, password);
    await signInSuccess();
  } catch (error) {
    signInView.showSignInMessage("error", error);
  }
};

const controlGoogleSignIn = async () => {
  try {
    await fireAuth.googleSignIn();
    await signInSuccess();

    // signInView.showSignInMessage("success");
  } catch (error) {
    signInView.showSignInMessage("error", error);
  }
};

const controlForgotPassBtn = () => {
  signInView.hideSection();
  forgotPassView.showSection();
};

const controlResetPass = async (email) => {
  try {
    await fireAuth.sendResetEmail(email);
    forgotPassView.showMessage("success");
  } catch (error) {
    forgotPassView.showMessage("error", error);
  }
};

const manageCurrentUser = async () => {
  const user = await fireAuth.getCurrentUser();
  if (user) {
    await model.setUserState(user);
    headerView.displayUserName(model.state.displayName);
    headerView.showUserIcon();
    headerView.showLogOutBtn();
    headerView.renderMyLists(model.state.lists);
    const pinnedListsData = model.selectPinnedLists();
    todoView.showPinnedLists(pinnedListsData);
    todoView.changeGridLayout(model.state.userOptions.layout);
  }
};

// const controlShowPinnedLists = () => {
//   console.log("here");

// };

const controlSaveList = (listData) => {
  if (listData.id) {
    model.updateList(listData);
  }
  if (!listData.id) {
    const id = model.saveNewList(listData);
    return id;
  }
  headerView.renderMyLists(model.state.lists);
};

const controlDisplayChosenList = (id) => {
  const list = model.getListById(id);
  todoView.renderSelectedList(list);
};

const controlDeleteList = (id) => {
  model.deleteList(id);
  headerView.renderMyLists(model.state.lists);
};

const controlChangeGrid = (numColumns) => {
  todoView.changeGridLayout(numColumns);
  model.updateUserGridLayout(numColumns);
};

const controlAddNewList = () => {
  const auth = getAuth();
  console.log(auth.currentUser);
  if (auth.currentUser) todoView.addList();
};

const init = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      manageCurrentUser();
    } else {
      model.clearCurrentUser();
      headerView.clearUserName();
    }
  });

  headerView.addHandlerLogInBtn(controlLogInBtn);
  headerView.addHandlerLogOutBtn(controlLogOutBtn);
  headerView.addHandlerDisplayChosenList(controlDisplayChosenList);
  headerView.addHandlerChangeGrid(controlChangeGrid);

  signInView.addHandlerCloseSection(controlCloseSection);
  signUpView.addHandlerSignUpForm(controlSignUp);
  signInView.addHandlerSignInForm(controlSignIn);
  signInView.addHandlerGoogleSignIn(controlGoogleSignIn);
  signInView.addHandlerForgotPassBtn(controlForgotPassBtn);

  forgotPassView.addHandlerResetPass(controlResetPass);
  forgotPassView.addHandlerCloseSection(controlCloseSection);

  todoView.addHandlerSaveListOnFocusOut(controlSaveList);
  todoView.addHandlerChooseColor(controlSaveList);
  todoView.addHandlerDeleteList(controlDeleteList);
  todoView.addHandlerRemoveCheckedItems(controlSaveList);
  todoView.addHandlerTogglePinOnList(controlSaveList);
  todoView.addHandlerAddNewList(controlAddNewList);
  todoView.addHandlerToggleCheckbox(controlSaveList);
  todoView.addHandlerRemoveListItem(controlSaveList);
};

init();

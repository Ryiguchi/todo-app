"use strict";

import headerView from "./views/headerView.js";
import todoView from "./views/todoView.js";
import signInView from "./views/signInView.js";
import signUpView from "./views/signUpView.js";
import forgotPassView from "./views/forgotPassView.js";
import accountSettingsView from "./views/accountSettingsView.js";
import changeProfilePictureView from "./views/changeProfilePictureView.js";
import * as model from "./model.js";
import * as fireAuth from "./utilities/firebase.auth.utils.js";
import * as firestore from "./utilities/firebase.store.utils.js";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const controlLogInBtn = () => {
  closeAllSections();
  signInView.showAuthSection();
};

const controlLogOutBtn = async () => {
  const auth = getAuth();
  if (!auth.currentUser) return;

  try {
    await fireAuth.signOutUser();
    model.clearCurrentUser();
    headerView.signOutUser();
    todoView.clearTodoLists();
    changeProfilePictureView.clearProfilePicture();
    closeAllSections();
    todoView.showTodoView();
  } catch (error) {
    headerView.signOutMessage("error", error);
  }
};

const closeAllSections = () => {
  signInView.hideSection();
  forgotPassView.hideSection();
  accountSettingsView.hideSection();
  todoView.hideTodoView();
};

const controlShowTodoSection = () => {
  closeAllSections();
  changeProfilePictureView.resetChangeProfileView();
  todoView.showTodoView();
};

const signInSuccess = async () => {
  signInView.hideSection();
  todoView.showTodoView();
  await manageCurrentUser();
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
  try {
    const user = await fireAuth.getCurrentUser();
    if (!user) return;
    const userData = await model.setUserState(user);
    headerView.setCurrentUser(model.state);
    changeProfilePictureView.setProfilePictureState(model.state.imgData);
    const pinnedListsData = model.selectPinnedLists();
    todoView.showPinnedLists(pinnedListsData);
    todoView.changeGridLayout(model.state.userOptions?.layout);
  } catch (error) {}
};

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
  if (auth.currentUser) todoView.addList();
};

const controlSaveNewName = async (newName) => {
  try {
    await model.changeUserDisplayName(newName);
    headerView.displayUserName(model.state.displayName);
    accountSettingsView.alertResult("display name");
  } catch (error) {
    accountSettingsView.alertResult("error", error);
  }
};

const controlSaveNewEmail = async (newEmail, password) => {
  try {
    const currentUser = await fireAuth.reauthenticateUser(password);
    await fireAuth.changeUserEmail(newEmail, currentUser);
    accountSettingsView.alertResult("email");
  } catch (error) {
    accountSettingsView.alertResult("error", error);
  }
};

const controlSaveNewPassword = async (oldPassword, newPassword) => {
  try {
    const currentUser = await fireAuth.reauthenticateUser(oldPassword);
    await fireAuth.changeUserPassword(newPassword, currentUser);
    accountSettingsView.alertResult("password");
  } catch (error) {
    accountSettingsView.alertResult("error", error);
  }
};

const controlOpenAccountSettings = () => {
  closeAllSections();
  accountSettingsView.showSection();
};

const controlSaveUserPicture = async (imgData, imgFile) => {
  changeProfilePictureView.setProfilePicture(imgData);
  headerView.setProfilePicture(imgData);
  try {
    await model.updateProfilePicture(imgData, imgFile);
    if (imgFile) await model.setUploadedImgUrlToState(imgFile);
    accountSettingsView.alertResult("profile picture");
  } catch (error) {
    accountSettingsView.alertResult("error", error);
  }
};

const controlCancelChangeProfilePic = () => {
  changeProfilePictureView.setProfilePictureState(model.state.imgData);
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
  headerView.addHandlerOpenAccountSettings(controlOpenAccountSettings);

  signInView.addHandlerCloseSection(controlShowTodoSection);
  signUpView.addHandlerSignUpForm(controlSignUp);
  signInView.addHandlerSignInForm(controlSignIn);
  signInView.addHandlerGoogleSignIn(controlGoogleSignIn);
  signInView.addHandlerForgotPassBtn(controlForgotPassBtn);

  forgotPassView.addHandlerResetPass(controlResetPass);
  forgotPassView.addHandlerCloseSection(controlShowTodoSection);

  todoView.addHandlerSaveListOnFocusOut(controlSaveList);
  todoView.addHandlerChooseColor(controlSaveList);
  todoView.addHandlerDeleteList(controlDeleteList);
  todoView.addHandlerRemoveCheckedItems(controlSaveList);
  todoView.addHandlerTogglePinInListOptions(controlSaveList);
  todoView.addHandlerTogglePinOnListTop(controlSaveList);
  todoView.addHandlerAddNewList(controlAddNewList);
  todoView.addHandlerToggleCheckbox(controlSaveList);
  todoView.addHandlerRemoveListItem(controlSaveList);
  todoView.addHandlerCheckAllItems(controlSaveList);

  accountSettingsView.addHandlerSaveNewName(controlSaveNewName);
  accountSettingsView.addHandlerSaveNewEmail(controlSaveNewEmail);
  accountSettingsView.addHandlerSaveNewPassword(controlSaveNewPassword);
  accountSettingsView.addHandlerCloseSection(controlShowTodoSection);

  changeProfilePictureView.addHandlerAcceptPicture(controlSaveUserPicture);
  changeProfilePictureView.addHandlerCancelChange(
    controlCancelChangeProfilePic
  );
};

init();

"use strict";

import { doc } from "@firebase/firestore";

class HeaderView {
  layoutIcon = document.querySelector(".layout-icon");
  myLists = document.querySelector(".my-lists-title-container");
  myListsContainer = document.querySelector(".my-lists-container");
  btnLogIn = document.querySelector(".btn-login");
  btnLogOut = document.querySelector(".btn-logout");
  userIcon = document.querySelector(".ph-user");
  userDropDown = document.querySelector(".user-dropdown-container");
  displayName = document.querySelector(".display-name");
  overlay = document.querySelector(".overlay");
  myListsUl = document.querySelector(".my-lists-container ul");
  layoutDropDownContainer = document.querySelector(
    ".layout-drop-down-container"
  );

  constructor() {
    this.#addHandlerToggleMyLists();
    this.#addHandlerUserIcon();
    this.#addHandlerOverlay();
    this.#addHandlerOpenLayoutMenu();
  }

  signOutMessage(result, error = null) {
    if (result === "success") {
      alert("You have successfully signed out.");
    }
    if (result === "error") {
      alert(`There was an error signing you out. Please try again! ${error}`);
    }
    if (result === "null") {
      alert("You are not logged in.");
    }
  }

  displayUserName(name) {
    this.displayName.textContent = name;
  }

  clearUserName() {
    this.displayName.textContent = "";
  }

  showLogOutBtn() {
    this.btnLogIn.classList.add("hidden");
    this.btnLogOut.classList.remove("hidden");
  }

  showLogInBtn() {
    this.btnLogOut.classList.add("hidden");
    this.btnLogIn.classList.remove("hidden");
  }

  toggleUserDropdown() {
    this.userDropDown.classList.toggle("hidden");
  }

  renderMyLists(lists) {
    this.myListsUl.innerHTML = "";
    let markup = "";
    lists.forEach((list) => {
      markup += `
        <li data-id="${list.id}">${list.title}</li>
      `;
    });

    this.myListsUl.insertAdjacentHTML("afterbegin", markup);
  }

  toggleMyLists() {
    this.myListsContainer.classList.toggle("hidden");
  }

  toggleLayoutDropDownMenu() {
    this.layoutDropDownContainer.classList.toggle("hidden");
  }

  #toggleOverlay() {
    this.overlay.classList.toggle("hidden");
  }

  #closeAllLists() {
    this.userDropDown.classList.add("hidden");
    this.myListsContainer.classList.add("hidden");
    this.layoutDropDownContainer.classList.add("hidden");
  }

  // Handlers

  #addHandlerToggleMyLists() {
    this.myLists.addEventListener("click", () => {
      this.toggleMyLists();
      this.overlay.classList.remove("hidden");
    });
  }

  #addHandlerUserIcon() {
    this.userIcon.addEventListener("click", () => {
      this.toggleUserDropdown();
      this.overlay.classList.remove("hidden");
    });
  }

  #addHandlerOverlay() {
    this.overlay.addEventListener("click", () => {
      this.#closeAllLists();
      this.#toggleOverlay();
    });
  }

  #addHandlerOpenLayoutMenu() {
    this.layoutIcon.addEventListener("click", () => {
      this.toggleLayoutDropDownMenu();
      this.#toggleOverlay();
    });
  }

  addHandlerLogInBtn(handler) {
    this.btnLogIn.addEventListener("click", () => {
      this.toggleUserDropdown();
      handler();
    });
  }

  addHandlerLogOutBtn(handler) {
    this.btnLogOut.addEventListener("click", () => {
      this.toggleUserDropdown();
      handler();
    });
  }

  addHandlerDisplayChosenList(handler) {
    this.myListsUl.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      this.toggleMyLists();
      this.#toggleOverlay();
      handler(id);
    });
  }

  addHandlerChangeGrid(handler) {
    this.layoutDropDownContainer.addEventListener("click", (e) => {
      const numColumns = e.target.dataset.grid;

      handler(numColumns);
    });
  }
}

export default new HeaderView();

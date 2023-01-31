"use strict";
class HeaderView {
  #header = document.querySelector("header");
  #layoutIcon = document.querySelector(".layout-icon");
  #myLists = document.querySelector(".my-lists-title-container");
  #myListsContainer = document.querySelector(".my-lists-container");
  #btnLogIn = document.querySelector(".btn-login");
  #btnLogOut = document.querySelector(".btn-logout");
  #userIcon = document.querySelector(".user-icon");
  #userDropDown = document.querySelector(".user-dropdown-container");
  #displayName = document.querySelector(".display-name");
  #overlay = document.querySelector(".overlay");
  #myListsUl = document.querySelector(".my-lists-container ul");
  #layoutDropDownContainer = document.querySelector(
    ".layout-drop-down-container"
  );
  #accountSettingsContainer = document.querySelector(
    ".account-setting-container"
  );

  constructor() {
    this.#addHandlerToggleLayoutMenu();
    this.#addHandlerToggleMyLists();
    this.#addHandlerToggleUserDropdown();
    this.#addHandlerOverlay();
    this.#addHandlerClickOnHeaderToCloseDropDownMenus();
  }

  #toggleLayoutDropDownMenu() {
    this.#layoutDropDownContainer.classList.toggle("hidden");
  }

  #toggleMyLists() {
    this.#myListsContainer.classList.toggle("hidden");
  }

  #toggleUserDropdown() {
    this.#userDropDown.classList.toggle("hidden");
  }

  #hideUserIcon() {
    this.#userIcon.classList.add("hidden");
  }

  #closeAllLists(activeMenu) {
    if (activeMenu !== "user") this.#userDropDown.classList.add("hidden");
    if (activeMenu !== "lists") this.#myListsContainer.classList.add("hidden");
    if (activeMenu !== "layout")
      this.#layoutDropDownContainer.classList.add("hidden");
  }

  #toggleOverlay() {
    this.#overlay.classList.toggle("hidden");
  }

  displayUserName(name) {
    this.#displayName.textContent = name;
  }

  clearUserName() {
    this.#displayName.textContent = "Log in to get started!";
  }

  showUserIcon() {
    this.#userIcon.classList.remove("hidden");
  }

  showLogOutBtn() {
    this.#btnLogIn.classList.add("hidden");
    this.#btnLogOut.classList.remove("hidden");
  }

  showLogInBtn() {
    this.#btnLogOut.classList.add("hidden");
    this.#btnLogIn.classList.remove("hidden");
  }

  clearMyLists() {
    this.#myListsUl.innerHTML = `
      <li data-id="-1">Log in to see your lists</li>
    `;
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

  renderMyLists(lists) {
    this.#myListsUl.innerHTML = "";
    let markup = "";
    lists.forEach((list) => {
      if (!list.pinned) return;
      markup += `
        <li class="my-list-item-li" data-id="${list.id}">
          <div class="my-list-items-container">
            ${list.title}
            <i class="ph-push-pin"></i>
          </div>
        </li>
      `;
    });

    lists.forEach((list) => {
      if (list.pinned) return;
      markup += `
        <li class="my-list-item-li" data-id="${list.id}">
          <div class="my-list-items-container">
            ${list.title}
          </div>
        </li>
      `;
    });

    this.#myListsUl.insertAdjacentHTML("afterbegin", markup);
  }

  // Handlers

  #addHandlerToggleLayoutMenu() {
    this.#layoutIcon.addEventListener("click", () => {
      this.#closeAllLists("layout");
      this.#toggleLayoutDropDownMenu();
      this.#toggleOverlay();
    });
  }

  #addHandlerToggleMyLists() {
    this.#myLists.addEventListener("click", () => {
      this.#closeAllLists("lists");
      this.#toggleMyLists();
      this.#toggleOverlay();
    });
  }

  #addHandlerToggleUserDropdown() {
    this.#userIcon.addEventListener("click", () => {
      this.#closeAllLists("user");
      this.#toggleUserDropdown();
      this.#toggleOverlay();
    });
  }

  #addHandlerClickOnHeaderToCloseDropDownMenus() {
    this.#header.addEventListener("click", (e) => {
      if (!e.target.classList.contains("header")) return;

      this.#closeAllLists();
    });
  }

  #addHandlerOverlay() {
    this.#overlay.addEventListener("click", () => {
      this.#closeAllLists();
      this.#toggleOverlay();
    });
  }

  addHandlerChangeGrid(handler) {
    this.#layoutDropDownContainer.addEventListener("click", (e) => {
      // gets the chosen number of columns
      const numColumns = e.target.dataset.grid;
      this.#toggleOverlay();
      this.#toggleLayoutDropDownMenu();
      handler(numColumns);
    });
  }

  addHandlerDisplayChosenList(handler) {
    this.#myListsUl.addEventListener("click", (e) => {
      const listId = e.target.closest(".my-list-item-li").dataset.id;
      // "listId = -1", is the "log in to see your lists" id
      if (listId === "-1") return;
      this.#toggleMyLists();
      this.#toggleOverlay();
      handler(listId);
    });
  }

  addHandlerOpenAccountSettings(handler) {
    this.#accountSettingsContainer.addEventListener("click", (e) => {
      this.#toggleUserDropdown();
      this.#toggleOverlay();
      handler();
    });
  }

  addHandlerLogInBtn(handler) {
    this.#btnLogIn.addEventListener("click", handler);
  }

  addHandlerLogOutBtn(handler) {
    this.#btnLogOut.addEventListener("click", () => {
      this.#toggleUserDropdown();
      this.#hideUserIcon();
      this.#toggleOverlay();
      handler();
    });
  }
}

export default new HeaderView();

"use strict";
class HeaderView {
  #header = document.querySelector("header");
  #layoutIcon = document.querySelector(".header__icon--layout");
  #myLists = document.querySelector(".header__my-lists-container");
  #myListsContainer = document.querySelector(".my-lists-menu");
  #btnLogIn = document.querySelector(".header__btn--login");
  #btnLogOut = document.querySelector(".header__btn--logout");
  #userIcon = document.querySelector(".header__user-icon");
  #userDropDown = document.querySelector(".user-menu");
  #displayName = document.querySelector(".header__display-name");
  #overlay = document.querySelector(".overlay");
  #myListsUl = document.querySelector(".my-lists-menu__list");
  #layoutDropDownContainer = document.querySelector(".layout-menu");
  #accountSettingsContainer = document.querySelector(".user-menu");
  #userImgContainer = document.querySelector(".header__user-img-container");
  #userImg = document.querySelector(".header__user-img");
  #userProfileContainer = document.querySelector(
    ".header__user-profile-container"
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
    console.log("here");
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

  #hideUserProfileContainer() {
    this.#userProfileContainer.classList.add("hidden");
  }

  #showUserProfileContainer() {
    this.#userProfileContainer.classList.remove("hidden");
  }

  hideLogInBtn() {
    this.#btnLogIn.classList.add("hidden");
  }

  showLogInBtn() {
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
        <li class="my-lists-menu__item" data-id="${list.id}">
          <div class="my-lists-menu__item-container">
            ${list.title}
            <i class="ph-push-pin my-lists-menu__icon"></i>
          </div>
        </li>
      `;
    });

    lists.forEach((list) => {
      if (list.pinned) return;
      markup += `
        <li class="my-lists-menu__item" data-id="${list.id}">
          <div class="my-lists-menu__item-container">
            ${list.title}
          </div>
        </li>
      `;
    });

    this.#myListsUl.insertAdjacentHTML("afterbegin", markup);
  }

  setProfilePicture(imgData = null) {
    this.#showUserProfileContainer();
    if (!imgData) {
      this.showUserIcon();
      return;
    }
    this.#userIcon.classList.add("hidden");
    this.#userImgContainer.classList.remove("hidden");

    const { zoom, x, y, url } = imgData;
    const scaledX = x * (4 / 25);
    const scaledY = y * (4 / 25);

    this.#userImgContainer.classList.remove("hidden");
    this.#userImg.src = url;
    this.#userImg.style.transform = `scale(${zoom}%) translate(${scaledX}px, ${scaledY}px)`;
  }

  signOutUser() {
    this.clearUserName();
    this.showLogInBtn();
    this.clearMyLists();
    this.#hideUserProfileContainer();
  }

  setCurrentUser(state) {
    const { imgData, lists, displayName } = state;
    this.displayUserName(displayName);
    this.setProfilePicture(imgData);
    this.renderMyLists(lists);
    this.hideLogInBtn();
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
    this.#userProfileContainer.addEventListener("click", (e) => {
      this.#closeAllLists("user");
      this.#toggleUserDropdown();
      this.#toggleOverlay();
    });
  }

  #addHandlerClickOnHeaderToCloseDropDownMenus() {
    this.#header.addEventListener("click", (e) => {
      if (!e.target.classList.contains("header")) return;

      this.#closeAllLists();
      this.#toggleOverlay();
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
      const listId = e.target.closest(".my-lists-menu__item").dataset.id;
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
      this.#hideUserIcon();
      handler();
    });
  }
}

export default new HeaderView();

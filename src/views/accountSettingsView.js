import AuthView from "./authView";

class AccountSettingsView extends AuthView {
  section = document.querySelector(".settings");
  page = document.querySelector(".settings");
  #menuContainer = document.querySelector(".settings-menu");
  #settingsContainers = document.querySelectorAll(".settings__section");
  #settingsMenuItems = document.querySelectorAll(".settings-menu__item");
  #changeNameContainer = document.querySelector(
    ".settings__section--change-name"
  );
  #changePictureContainer = document.querySelector(
    ".settings__section--change-picture"
  );
  #changeEmailContainer = document.querySelector(
    ".settings__section--change-email"
  );
  #changePasswordContainer = document.querySelector(
    ".settings__section--change-password"
  );
  inputFields = document.querySelectorAll(".input");
  #changeNameForm = document.querySelector(".form--change-name");
  #changeNameField = document.querySelector(".form__input__change-name");
  #changeEmailForm = document.querySelector(".form--change-email");
  #changeEmailField = document.querySelector(
    ".form__input__change-email--email"
  );
  #changeEmailPasswordField = document.querySelector(
    ".form__input__change-email--password"
  );
  #changePasswordForm = document.querySelector(".change-password-form");
  #changePassordOldField = document.querySelector(
    ".form__input__change-password--old-password"
  );
  #changePasswordNewField = document.querySelector(
    ".form__input__change-password--new-password"
  );
  #closeSectionBtn = document.querySelector(".settings__icon--close");

  constructor() {
    super();
    this.addHandlerInputFields();
    this.addHandlerLabelShrinkOnBlur();
    this.#addHandlerSelectMenuItem();
  }

  alertResult(type, error = null) {
    if (type !== "error") alert(`Your ${type} was successfully updated!`);
    if (type === "error") this.handleError(error);
  }

  #displaySelectedMenu(selectedItem) {
    const menu = selectedItem.dataset.menu;
    this.#settingsContainers.forEach((el) => el.classList.add("hidden"));
    this.#settingsMenuItems.forEach(
      (el) => (el.style.borderLeft = "1px solid #fff")
    );
    selectedItem.style.borderLeft = "1px solid #333";
    menu === "name" && this.#changeNameContainer.classList.remove("hidden");

    menu === "email" && this.#changeEmailContainer.classList.remove("hidden");

    menu === "password" &&
      this.#changePasswordContainer.classList.remove("hidden");

    menu === "picture" &&
      this.#changePictureContainer.classList.remove("hidden");
  }

  //Handlers

  #addHandlerSelectMenuItem() {
    this.#menuContainer.addEventListener("click", (e) => {
      const selectedItem = e.target.closest(".settings-menu__item");
      this.#displaySelectedMenu(selectedItem);
    });
  }

  addHandlerCloseSection(handler) {
    this.#closeSectionBtn.addEventListener("click", (e) => {
      handler();
    });
  }

  addHandlerSaveNewName(handler) {
    this.#changeNameForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newName = this.#changeNameField.value;
      handler(newName);

      this.clearInputFields();
    });
  }

  addHandlerSaveNewEmail(handler) {
    this.#changeEmailForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newEmail = this.#changeEmailField.value;
      const password = this.#changeEmailPasswordField.value;
      handler(newEmail, password);

      this.clearInputFields();
    });
  }

  addHandlerSaveNewPassword(handler) {
    this.#changePasswordForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const oldPassword = this.#changePassordOldField.value;
      const newPassword = this.#changePasswordNewField.value;
      handler(oldPassword, newPassword);

      this.clearInputFields();
    });
  }
}

export default new AccountSettingsView();

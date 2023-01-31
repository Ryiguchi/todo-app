import AuthView from "./authView";

class AccountSettingsView extends AuthView {
  section = document.querySelector(".account-settings-section");
  page = document.querySelector(".account-settings-section");
  #menuContainer = document.querySelector(".account-settings-menu-container");
  #settingsMenuItems = document.querySelectorAll(".account-settings-menu-item");
  #settingsContainers = document.querySelectorAll(
    ".account-settings-container"
  );
  #changeNameContainer = document.querySelector(".change-name-container");
  #changePictureContainer = document.querySelector(".change-picture-container");
  #changeEmailContainer = document.querySelector(".change-email-container");
  #changePasswordContainer = document.querySelector(
    ".change-password-container"
  );
  inputFields = document.querySelectorAll(".auth-input");
  #changeNameForm = document.querySelector(".change-name-form");
  #changeNameField = document.querySelector(".change-name-field");
  #changeEmailForm = document.querySelector(".change-email-form");
  #changeEmailField = document.querySelector(".change-email-field");
  #changeEmailPasswordField = document.querySelector(".password-field");
  #changePasswordForm = document.querySelector(".change-password-form");
  #changePassordOldField = document.querySelector(".old-password-field");
  #changePasswordNewField = document.querySelector(".new-password-field");
  #closeSectionBtn = document.querySelector(".close-settings-btn");

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
      const selectedItem = e.target.closest(".account-settings-menu-item");
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

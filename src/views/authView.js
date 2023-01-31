"use strict";

export default class AuthView {
  #inputFields = document.querySelectorAll("form input");
  overlay = document.querySelector(".overlay");
  authSection = document.querySelector(".authentication-section");

  constructor() {
    this.#addHandlerReload();
  }

  hideSection() {
    this.page.classList.add("hidden");
    this.#clearAllInputFields();
  }

  showSection() {
    this.page.classList.remove("hidden");
  }

  showAuthSection() {
    this.page.classList.remove("hidden");
  }

  #moveLabel(labelEl) {
    labelEl.classList.add("shrink");
  }

  #clearAllInputFields() {
    this.#inputFields.forEach((field) => (field.value = ""));
  }

  clearInputFields() {
    this.inputFields.forEach((field) => (field.value = ""));
  }

  handleError(error) {
    switch (error.message) {
      case "auth/user-not-found":
        alert("There was no account found that matches the entered email.");
        return;

      case "auth/wrong-password":
        alert("Wrong password. Try again.");
        return;

      case "auth/popup-closed-by-user":
        alert(
          "Login was unsuccessful because the popup was closed by the user."
        );
        return;

      case "auth/too-many-requests":
        alert("Too many requests. Try again later.");
        return;

      case "auth/email-already-exists":
        alert("The provided email is already in use. Try logging in instead.");
        return;

      case "auth/internal-error":
        alert(
          "An unexpected error occurred while trying to process the request. Try again later."
        );
        return;

      default:
        alert(`There was a problem signing you in. Please try again! ${error}`);
    }
  }

  // Handers

  #addHandlerReload() {
    window.addEventListener("load", this.#clearAllInputFields.bind(this));
  }

  addHandlerInputFields() {
    this.section.addEventListener("click", (e) => {
      if (!e.target.classList.contains("auth-label")) return;
      const inputEl = e.target.nextElementSibling;
      const labelEl = e.target;
      this.#moveLabel(labelEl);
      inputEl.focus();
    });

    this.section.addEventListener("focusin", (e) => {
      if (!e.target.classList.contains("auth-input")) return;
      const labelEl = e.target.previousElementSibling;
      this.#moveLabel(labelEl);
    });
  }

  addHandlerLabelShrinkOnBlur() {
    this.section.addEventListener("focusout", (e) => {
      if (!e.target.classList.contains("auth-input")) return;

      const labelEl = e.target.previousElementSibling;
      if (!e.target.value) {
        labelEl.classList.remove("shrink");
      }
    });
  }

  addHandlerCloseSection(handler) {
    this.closeBtn.addEventListener("click", handler);
  }
}

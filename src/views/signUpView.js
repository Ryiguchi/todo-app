"use strict";

import AuthView from "./authView.js";

class SignUpView extends AuthView {
  section = document.querySelector(".auth__sign-up");
  form = document.querySelector(".form--sign-up");
  nameField = document.querySelector(".auth__input--sign-up-name");
  emailField = document.querySelector(".auth__input--sign-up-email");
  passwordField = document.querySelector(".auth__input--sign-up-password");
  confirmPasswordField = document.querySelector(
    ".auth__input--sign-up-confirm"
  );
  inputFields = document.querySelectorAll(".auth__input--sign-up");

  constructor() {
    super();
    this.addHandlerInputFields();
    this.addHandlerLabelShrinkOnBlur();
  }

  handleErrors(error) {
    switch (error.message) {
      case "auth/email-already-in-use":
        alert("An account already exists with the provided email.");
        return;
      case "auth/weak-password":
        alert("Passwords must be at least 6 characters.");
      default:
        alert(`There was a problem signing you up. Please try again! ${error}`);
    }
  }

  showSignUpMessage(result, error = null) {
    if (result === "success") {
      alert("You have successfully signed up");
    }
    if (result === "error") this.handleErrors(error);
  }

  addHandlerSignUpForm(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = this.nameField.value;
      const email = this.emailField.value;
      const password = this.passwordField.value;
      const confirmPassword = this.confirmPasswordField.value;

      if (password !== confirmPassword) {
        alert('Your passwords don"t match!');
        return;
      }

      handler(name, email, password);
      this.clearInputFields();
    });
  }
}

export default new SignUpView();

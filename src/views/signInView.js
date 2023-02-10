"use strict";

import AuthView from "./authView.js";

class SignInView extends AuthView {
  closeBtn = document.querySelector(".auth__icon--close");
  page = document.querySelector(".auth__section");
  section = document.querySelector(".auth__sign-in");
  form = document.querySelector(".form--sign-in");
  googleBtn = document.querySelector(".auth__btn--google");
  forgotPassBtn = document.querySelector(".auth__reset-password__link");
  inputFields = document.querySelectorAll(".auth__input--sign-in");
  emailField = document.querySelector(".auth__input--sign-in-email");
  passwordField = document.querySelector(".auth__input--sign-in-password");

  constructor() {
    super();

    this.addHandlerInputFields();
    this.addHandlerLabelShrinkOnBlur();
  }

  showSignInMessage(result, error = null) {
    if (result === "success") {
      alert("You have successfully signed in!");
    }
    if (result === "error") this.handleError(error);
  }

  //  Handlers

  addHandlerGoogleSignIn(handler) {
    this.googleBtn.addEventListener("click", handler);
  }

  addHandlerSignInForm(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = this.emailField.value;
      const password = this.passwordField.value;
      handler(email, password);
      this.clearInputFields();
    });
  }

  addHandlerForgotPassBtn(handler) {
    this.forgotPassBtn.addEventListener("click", handler);
  }
}

export default new SignInView();

"use strict";

import AuthView from "./authView.js";

class SignInView extends AuthView {
  closeBtn = document.querySelector(".close-auth-btn");
  page = document.querySelector(".authentication-section");
  section = document.querySelector(".sign-in-section");
  form = document.querySelector(".sign-in-form");
  googleBtn = document.querySelector(".google-btn");
  forgotPassBtn = document.querySelector(".btn-reset-password");
  inputFields = document.querySelectorAll(".sign-in-section input");
  emailField = document.querySelector(".sign-in-email-field");
  passwordField = document.querySelector(".sign-in-pass-field");

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

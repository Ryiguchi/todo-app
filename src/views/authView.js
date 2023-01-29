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
  }

  showAuthSection() {
    this.page.classList.remove("hidden");
  }

  moveLabel(labelEl) {
    labelEl.classList.add("shrink");
  }

  #clearAllInputFields() {
    this.#inputFields.forEach((field) => (field.value = ""));
  }

  clearInputFields() {
    this.inputFields.forEach((field) => (field.value = ""));
  }

  addHandlerInputFields() {
    this.section.addEventListener("click", (e) => {
      if (!e.target.classList.contains("auth-label")) return;
      const inputEl = e.target.nextSibling.nextSibling;
      const labelEl = e.target;
      this.moveLabel(labelEl);
      inputEl.focus();
      inputEl.addEventListener("blur", (e) => {
        if (!e.target.value) {
          labelEl.classList.remove("shrink");
        }
      });
    });
  }

  #addHandlerReload() {
    window.addEventListener("load", this.#clearAllInputFields.bind(this));
  }

  addHandlerCloseSection(handler) {
    this.closeBtn.addEventListener("click", handler);
  }
}

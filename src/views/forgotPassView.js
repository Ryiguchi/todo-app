import AuthView from "./authView";

class ForgotPassView extends AuthView {
  section = document.querySelector(".forgot-password__section");
  page = document.querySelector(".forgot-password__section");
  closeBtn = document.querySelector(".forgot-password__icon--close");
  #emailField = document.querySelector(".form__input__forgot");
  #form = document.querySelector(".form--forgot");

  constructor() {
    super();
    this.addHandlerInputFields();
    this.addHandlerLabelShrinkOnBlur();
  }

  // Helpers
  #getEmail() {
    return this.#emailField.value;
  }

  #clearEmailField() {
    this.#emailField.value = "";
  }

  // showSection() {
  //   this.section.classList.remove("hidden");
  // }

  // Methods
  handleError(error) {
    switch (error) {
      default:
        alert(`A problem occurred. Please try again. ${error}`);
    }
  }

  showMessage(result, error = null) {
    if (result === "success")
      alert("A link to reset your email has been sent.");
    if (result === "error") this.handleError(error);
  }

  // Handlers
  addHandlerResetPass(handler) {
    this.#form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = this.#getEmail();
      handler(email);
      this.#clearEmailField();
    });
  }
}

export default new ForgotPassView();

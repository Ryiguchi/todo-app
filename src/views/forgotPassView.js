import AuthView from "./authView";

class ForgotPassView extends AuthView {
  section = document.querySelector(".forgot-pass-section");
  page = document.querySelector(".forgot-pass-section");
  closeBtn = document.querySelector(".close-forgot-pass-btn");
  emailField = document.querySelector(".email-field-forgot-pass");

  form = document.querySelector(".forgot-pass-section form");
  constructor() {
    super();
    this.addHandlerInputFields();
  }

  handleError(error) {
    switch (error) {
      default:
        alert(`A problem occurred. Please try again. ${error}`);
    }
  }

  showSection() {
    this.section.classList.remove("hidden");
  }

  showMessage(result, error = null) {
    if (result === "success")
      alert("A link to reset your email has been sent.");
    if (result === "error") this.handleError(error);
  }

  addHandlerResetPass(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = this.emailField.value;
      handler(email);
      this.emailField.value = "";
    });
  }
}

export default new ForgotPassView();

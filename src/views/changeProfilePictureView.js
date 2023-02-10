"use strict";

class ChangeProfilePictureView {
  #selectPicture = document.querySelector(".change-picture__select");
  #pictureFrame = document.querySelector(".change-picture__frame");
  #userImg = document.querySelector(".change-picture__user-img");
  #allInputsContainers = document.querySelectorAll(
    ".change-picture__inputs-container"
  );
  #zoomNumInput = document.querySelector(".change-picture__input--zoom-num");
  #zoomRangeInput = document.querySelector(
    ".change-picture__input--zoom-range"
  );
  #uploadFileInput = document.querySelector(".change-picture__input--upload");
  #urlInput = document.querySelector(".change-picture__input--url");
  #uploadBtn = document.querySelector(".settings__btn--upload");
  #allBtns = document.querySelectorAll(".change-picture__button");
  #changeBtn = document.querySelector(".settings__btn--change");
  #acceptBtn = document.querySelector(".settings__btn--accept");
  #resetBtn = document.querySelector(".settings__btn--reset");
  #cancelBtn = document.querySelector(".settings__btn--cancel");
  #submitBtn = document.querySelector(".settings__btn--url");
  // #selectInputsContainer = document.querySelector(
  //   ".change-picture__inputs-container--select"
  // );
  #editInputsContainer = document.querySelector(
    ".change-picture__inputs-container--edit"
  );

  #zoomValue = 100;
  #offsetX = 0;
  #offsetY = 0;
  #uploadedFile = null;

  constructor() {
    this.#addHandlerDragEnter();
    this.#addHandlerDragleave();
    this.#addHandlerDragOver();
    this.#addHandlerDrop();
    this.#addHandlerAdjustPicture();
    this.#addHandlerChangePictureButton();
    this.#addHandlerResetImg();
    this.#addHandlerSubmitUrl();
    this.#addHandlerUploadFile();
    this.#addHandlerOpenSelectFileWindow();
  }

  #changeMode(mode) {
    this.#pictureFrame.classList.remove("edit", "select");
    this.#allBtns.forEach((btn) => btn.classList.add("hidden"));
    this.#allInputsContainers.forEach((container) =>
      container.classList.add("hidden")
    );
    this.#selectPicture.classList.add("hidden");
    this.#userImg.classList.add("hidden");

    if (mode === "picture") {
      this.#userImg.classList.remove("hidden");
      this.#changeBtn.classList.remove("hidden");
    }
    if (mode === "select") {
      this.#pictureFrame.classList.add("select");
      this.#selectPicture.classList.remove("hidden");
      this.#cancelBtn.classList.remove("hidden");
      this.#resetUserImageSrc();
    }
    if (mode === "edit") {
      this.#pictureFrame.classList.add("edit");
      this.#userImg.classList.remove("hidden");
      this.#acceptBtn.classList.remove("hidden");
      this.#resetBtn.classList.remove("hidden");
      this.#cancelBtn.classList.remove("hidden");
      this.#editInputsContainer.classList.remove("hidden");
    }
  }

  #resetUserImageSrc() {
    this.#userImg.src = "//:0";
  }

  #resetUserImageFile() {
    this.#uploadedFile = null;
  }

  resetChangeProfileView() {
    this.#uploadedFile = "";
    this.#changeMode("picture");
  }

  setProfilePictureState(imgData = null) {
    if (!imgData || !imgData?.url) {
      this.#changeMode("select");
      return;
    }
    if (imgData.url) {
      this.#changeMode("picture");
      this.setProfilePicture(imgData);
    }
  }

  clearProfilePicture() {
    this.setProfilePictureState();
    this.#resetUserImageSrc();
  }

  #changeRangeValue(value) {
    const rangeValue = Math.round(value / 10) * 10;
    this.#zoomRangeInput.value = rangeValue;
  }

  #adjustImg() {
    this.#userImg.style.transform = `scale(${this.#zoomValue}%) translate(${
      this.#offsetX
    }px, ${this.#offsetY}px)`;
  }

  setProfilePicture(imgData) {
    this.#changeMode("picture");
    const { url, x, y, zoom } = imgData;
    this.#userImg.src = url;
    this.#userImg.style.transform = `scale(${zoom}%) translate(${x}px, ${y}px)`;
  }

  #resetImgValues() {
    this.#zoomValue = 100;
    this.#offsetX = 0;
    this.#offsetY = 0;

    this.#zoomNumInput.value = 100;
    this.#zoomRangeInput.value = 100;
    this.#urlInput.value = "";
  }

  #getImgValues() {
    return {
      zoom: this.#zoomValue,
      x: this.#offsetX,
      y: this.#offsetY,
      url: this.#userImg.src,
    };
  }

  // Handlers

  #addHandlerOpenSelectFileWindow() {
    this.#uploadBtn.addEventListener("click", () => {
      this.#uploadFileInput.click();
    });
  }

  #addHandlerUploadFile() {
    this.#uploadFileInput.addEventListener("change", (e) => {
      const file = e.target.files;
      const imgUrl = URL.createObjectURL(file[0]);

      this.#userImg.src = imgUrl;
      this.#uploadedFile = file[0];
      this.#userImg.style.transform = "none";
      this.#changeMode("edit");
    });
  }

  #addHandlerDragEnter() {
    this.#pictureFrame.addEventListener("dragenter", (e) => {
      e.preventDefault();
      if (!this.#pictureFrame.classList.contains("select")) return;
      this.#pictureFrame.classList.add("dragover");
    });
  }

  #addHandlerDragOver() {
    this.#pictureFrame.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (!this.#pictureFrame.classList.contains("select")) return;
    });
  }

  #addHandlerDragleave() {
    this.#pictureFrame.addEventListener("dragleave", (e) => {
      e.preventDefault();
      if (!this.#pictureFrame.classList.contains("select")) return;

      if (e.relatedTarget?.closest(".dropzone")) return;
      this.#pictureFrame.classList.remove("dragover");
    });
  }

  #addHandlerDrop() {
    this.#pictureFrame.addEventListener("drop", (e) => {
      e.preventDefault();
      if (!this.#pictureFrame.classList.contains("select")) return;

      try {
        const imgUrl = e.dataTransfer.getData("Text");
        this.#userImg.src = imgUrl;
        this.#userImg.style.transform = "none";
        this.#changeMode("edit");
      } catch (error) {
        alert(
          'The image was either invalid or you didn"t have permission to use it.'
        );
      }
    });
  }

  #addHandlerAdjustPicture() {
    let isMouseDown = false;
    let initX;
    let initY;

    this.#pictureFrame.addEventListener("mousedown", (e) => {
      e.preventDefault();
      if (!this.#pictureFrame.classList.contains("edit")) return;

      isMouseDown = true;
      initX = e.layerX - this.#offsetX;
      initY = e.layerY - this.#offsetY;
    });

    this.#pictureFrame.addEventListener("mousemove", (e) => {
      e.preventDefault();
      if (!this.#pictureFrame.classList.contains("edit")) return;
      if (!isMouseDown) return;

      this.#offsetX = e.layerX - initX;
      this.#offsetY = e.layerY - initY;
      this.#adjustImg();
    });

    this.#pictureFrame.addEventListener("mouseup", (e) => {
      if (!this.#pictureFrame.classList.contains("edit")) return;

      isMouseDown = false;
    });

    this.#pictureFrame.addEventListener("mouseleave", (e) => {
      if (!this.#pictureFrame.classList.contains("edit")) return;

      if (!isMouseDown) return;
      isMouseDown = false;
    });

    this.#zoomNumInput.addEventListener("input", (e) => {
      this.#zoomValue = this.#zoomNumInput.value;
      this.#changeRangeValue(this.#zoomValue);
      this.#adjustImg();
    });

    this.#zoomRangeInput.addEventListener("input", (e) => {
      this.#zoomValue = this.#zoomRangeInput.value;
      this.#zoomNumInput.value = this.#zoomValue;
      this.#adjustImg();
    });

    this.#pictureFrame.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (!this.#pictureFrame.classList.contains("edit")) return;

      const wheelZoom = e.deltaY;
      this.#zoomNumInput.value =
        +this.#zoomNumInput.value + (wheelZoom < 0 ? 10 : -10);
      this.#zoomRangeInput.value =
        +this.#zoomRangeInput.value + (wheelZoom < 0 ? 10 : -10);
      this.#zoomValue = this.#zoomNumInput.value;
      this.#adjustImg();
    });
  }

  addHandlerAcceptPicture(handler) {
    this.#acceptBtn.addEventListener("click", () => {
      const imgValues = this.#getImgValues();
      this.#resetImgValues();
      handler(imgValues, this.#uploadedFile);
      this.#resetUserImageFile();
    });
  }

  #addHandlerChangePictureButton() {
    this.#changeBtn.addEventListener("click", () => {
      this.#resetImgValues();
      this.#changeMode("select");
    });
  }

  #addHandlerResetImg() {
    this.#resetBtn.addEventListener("click", () => {
      this.#resetImgValues();
      this.#adjustImg();
    });
  }

  addHandlerCancelChange(handler) {
    this.#cancelBtn.addEventListener("click", () => {
      this.#resetImgValues();
      this.#resetUserImageFile();
      handler();
    });
  }

  #addHandlerSubmitUrl() {
    this.#submitBtn.addEventListener("click", () => {
      const url = this.#urlInput.value;
      this.#userImg.src = url;
      this.#userImg.style.transform = "none";
      this.#changeMode("edit");
    });
  }
}

export default new ChangeProfilePictureView();

"use strict";

class ChangeProfilePictureView {
  #selectCircle = document.querySelector(".select-picture-circle");
  #editCircle = document.querySelector(".edit-picture-circle");
  #circleEditContainer = document.querySelector(".circle-edit-container");
  #outerFrames = document.querySelectorAll(".change-picture-outer-frame");
  #pictureFrame = document.querySelector(".picture-outer-frame");
  #selectFrame = document.querySelector(".select-outer-frame");
  #userImg = document.querySelector(".user-img");
  #allInputsContainers = document.querySelectorAll(".inputs-container");
  #zoomNumInput = document.querySelector(".zoom-num-input");
  #zoomRangeInput = document.querySelector(".zoom-range-input");
  #uploadFileInput = document.querySelector(".upload-file-input");
  #urlInput = document.querySelector(".url-input");
  #uploadBtn = document.querySelector(".upload-btn");
  #allBtns = document.querySelectorAll(".button-container button");
  #changeBtn = document.querySelector(".change-btn");
  #acceptBtn = document.querySelector(".accept-btn");
  #resetBtn = document.querySelector(".reset-btn");
  #cancelBtn = document.querySelector(".cancel-btn");
  #submitBtn = document.querySelector(".url-submit-btn");
  #selectInputsContainer = document.querySelector(
    ".select-img-inputs-container"
  );
  #editInputsContainer = document.querySelector(".edit-img-inputs-container");

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
    this.#allBtns.forEach((btn) => btn.classList.add("hidden"));
    this.#allInputsContainers.forEach((container) =>
      container.classList.add("hidden")
    );
    this.#editCircle.classList.add("hidden");
    this.#selectCircle.classList.add("hidden");
    this.#outerFrames.forEach((frame) => frame.classList.add("hidden"));
    this.#pictureFrame.classList.remove("picture-mode");
    this.#circleEditContainer.classList.add("hidden");

    if (mode === "picture") {
      this.#changeBtn.classList.remove("hidden");
      this.#pictureFrame.classList.remove("hidden");
      this.#pictureFrame.classList.add("picture-mode");
    }
    if (mode === "select") {
      this.#cancelBtn.classList.remove("hidden");
      this.#selectInputsContainer.classList.remove("hidden");
      this.#selectFrame.classList.remove("hidden");
      this.#selectCircle.classList.remove("hidden");

      this.#circleEditContainer.classList.remove("hidden");
      this.#resetUserImageSrc();
    }
    if (mode === "edit") {
      this.#acceptBtn.classList.remove("hidden");
      this.#resetBtn.classList.remove("hidden");
      this.#cancelBtn.classList.remove("hidden");

      this.#editInputsContainer.classList.remove("hidden");
      this.#editCircle.classList.remove("hidden");

      this.#pictureFrame.classList.remove("hidden");
      this.#circleEditContainer.classList.remove("hidden");
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
    this.#selectCircle.addEventListener("dragenter", (e) => {
      e.preventDefault();
      this.#selectCircle.classList.add("dragover");
    });
  }

  #addHandlerDragOver() {
    this.#selectCircle.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
  }

  #addHandlerDragleave() {
    this.#selectCircle.addEventListener("dragleave", (e) => {
      e.preventDefault();
      if (e.relatedTarget?.closest(".dropzone")) return;
      this.#selectCircle.classList.remove("dragover");
    });
  }

  #addHandlerDrop() {
    this.#selectCircle.addEventListener("drop", (e) => {
      e.preventDefault();
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
      isMouseDown = true;
      initX = e.offsetX - this.#offsetX;
      initY = e.offsetY - this.#offsetY;
    });

    this.#pictureFrame.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      this.#offsetX = e.offsetX - initX;
      this.#offsetY = e.offsetY - initY;
      this.#adjustImg();
    });

    this.#pictureFrame.addEventListener("mouseup", (e) => {
      isMouseDown = false;
    });

    this.#pictureFrame.addEventListener("mouseleave", (e) => {
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

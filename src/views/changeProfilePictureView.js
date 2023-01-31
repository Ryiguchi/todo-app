"use strict";

class ChangeProfilePictureView {
  #pictureCircle = document.querySelector(".change-picture-circle");
  #circleEditContainer = document.querySelector(".circle-edit-container");
  #pictureFrame = document.querySelector(".change-picture-outer-frame");
  #userImg = document.querySelector(".user-img");
  #zoomNumInput = document.querySelector(".zoom-num-input");
  #zoomRangeInput = document.querySelector(".zoom-range-input");
  #urlInput = document.querySelector(".url-input");
  #changeBtn = document.querySelector(".change-btn");
  #acceptBtn = document.querySelector(".accept-btn");
  #resetBtn = document.querySelector(".reset-btn");
  #cancelBtn = document.querySelector(".cancel-btn");
  #submitBtn = document.querySelector(".url-submit-btn");
  #editBtnsContainer = document.querySelector(".edit-btns-container");
  #editInputsContainer = document.querySelector(".edit-inputs-container");
  #urlInputUploadContainer = document.querySelector(".img-url-input-container");

  #zoomValue = 100;
  #offsetX = 0;
  #offsetY = 0;

  constructor() {
    this.#addHandlerDragEnter();
    this.#addHandlerDragleave();
    this.#addHandlerDragOver();
    this.#addHandlerDrop();
    this.#addHandlerAdjustPicture();
    this.#addHandlerChangePictureButton();
    this.#addHandlerResetImg();
    this.#addHandlerSubmitUrl();
  }

  #showEditMode() {
    this.#pictureCircle.classList.remove("dragover");
    this.#pictureCircle.classList.add("edit-mode-circle");
    this.#circleEditContainer.classList.add("hidden");
    this.#editBtnsContainer.classList.remove("hidden");
    this.#changeBtn.classList.add("hidden");
    this.#submitBtn.classList.add("hidden");
    this.#acceptBtn.classList.remove("hidden");
    this.#editInputsContainer.classList.remove("hidden");
    this.#urlInputUploadContainer.classList.add("hidden");
  }

  #showPictureMode() {
    this.#pictureCircle.classList.add("hidden");
    this.#pictureFrame.classList.add("picture-mode-frame");
    this.#editBtnsContainer.classList.add("hidden");
    this.#changeBtn.classList.remove("hidden");
    this.#editInputsContainer.classList.add("hidden");
    this.#urlInputUploadContainer.classList.add("hidden");
  }

  #showUploadMode() {
    this.#pictureCircle.classList.remove("hidden");
    this.#pictureCircle.classList.remove("dragover");
    this.#pictureCircle.classList.remove("edit-mode-circle");
    this.#pictureFrame.classList.remove("picture-mode-frame");
    this.#urlInputUploadContainer.classList.remove("hidden");
    this.#circleEditContainer.classList.remove("hidden");
    this.#editBtnsContainer.classList.remove("hidden");
    this.#changeBtn.classList.add("hidden");
    this.#acceptBtn.classList.add("hidden");
    this.#submitBtn.classList.remove("hidden");

    this.#editInputsContainer.classList.add("hidden");
    this.#resetUserImageSrc();
  }

  #resetUserImageSrc() {
    this.#userImg.src = "//:0";
  }

  setProfilePictureState(imgData = null) {
    if (!imgData || !imgData?.url) {
      this.#showUploadMode();
      return;
    }
    if (imgData.url) {
      this.#showPictureMode();
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
    this.#showPictureMode();
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

  // Handlers

  #addHandlerDragEnter() {
    this.#pictureCircle.addEventListener("dragenter", (e) => {
      e.preventDefault();
      this.#pictureCircle.classList.add("dragover");
    });
  }

  #addHandlerDragOver() {
    this.#pictureCircle.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
  }

  #addHandlerDragleave() {
    this.#pictureCircle.addEventListener("dragleave", (e) => {
      e.preventDefault();
      if (e.relatedTarget?.closest(".dropzone")) return;
      this.#pictureCircle.classList.remove("dragover");
    });
  }

  #addHandlerDrop() {
    this.#pictureCircle.addEventListener("drop", (e) => {
      e.preventDefault();
      console.log(e.dataTransfer.getData("Text"));
      try {
        const imgUrl = e.dataTransfer.getData("Text");
        this.#userImg.src = imgUrl;
        this.#userImg.style.transform = "none";
        this.#showEditMode();
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
      const imgValues = {
        zoom: this.#zoomValue,
        x: this.#offsetX,
        y: this.#offsetY,
        url: this.#userImg.src,
      };
      this.#resetImgValues();
      handler(imgValues);
    });
  }

  #addHandlerChangePictureButton() {
    this.#changeBtn.addEventListener("click", () => {
      this.#resetImgValues();
      this.#showUploadMode();
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
      handler();
    });
  }

  #addHandlerSubmitUrl() {
    this.#submitBtn.addEventListener("click", () => {
      const url = this.#urlInput.value;
      console.log(url);
      this.#userImg.src = url;
      this.#userImg.style.transform = "none";
      this.#showEditMode();
    });
  }
}

export default new ChangeProfilePictureView();

"use strict";

import { todoItem } from "../templates/templates";

class TodoView {
  todoSection = document.querySelector(".todo-section");
  checkboxContainer = document.querySelector(".todo-checkbox-container");
  todoItemsContainer = document.querySelector(".todo-items-container");
  checkboxEmpty = document.querySelector(".todo-box");
  checkboxChecked = document.querySelector(".todo-box-checked");
  addItemIcon = document.querySelector(".add-item-icon");
  removeItemIcon = document.querySelector(".remove-item-icon");
  addItemContainer = document.querySelector(".add-item-container");
  listOptionsIcons = document.querySelectorAll(".list-options-icon");
  listOptionsContainers = document.querySelectorAll(".list-options-container");
  allTodoLists = document.querySelectorAll(".todo-item");
  overlay = document.querySelector(".overlay");
  iconAddList = document.querySelector(".add-list-icon");
  addListContainer = document.querySelector(".add-list-container");

  constructor() {
    this.#addHandlerFocusOnSelectedList();
    this.#addHandlerAddListItem();
    this.#addHandlerPressEnterOnListItem();
    this.#addHandlerListToggleListOptions();
    this.#addHandlerClickOverlay();
    this.#addHandlerCloseList();
  }

  #selectList(element) {
    return element.closest(".todo-item");
  }

  #selectNewListItem(todoItemsContainer) {
    return todoItemsContainer.lastChild.previousElementSibling;
  }

  hideTodoView() {
    this.todoSection.classList.add("hidden");
  }

  showTodoView() {
    this.todoSection.classList.remove("hidden");
  }

  toggleCheckbox(element) {
    const container = element.parentElement;
    container
      .querySelectorAll(".checkbox")
      .forEach((el) => el.classList.toggle("hidden"));
  }

  toggleStrikeThrough(item) {
    item.querySelector(".todo-item-text").classList.toggle("line-through");
  }

  addNewLine(element, placement) {
    const markup = `
      <div class="todo-item-container">
        <div class="todo-checkbox-container">
          <i class="ph-check-square checkbox todo-box-checked hidden"></i>
          <i class="ph-square checkbox todo-box"></i>
        </div>
        <div class="todo-item-text" contenteditable="true" ></div>
        <i class="ph-minus-circle remove-item-icon"></i>
      </div>
    `;

    element.insertAdjacentHTML(placement, markup);
  }

  #clearTextFromItem(item) {
    item.querySelector(".todo-item-text").textContent = "";
  }

  #showEmptyCheckbox(item) {
    item.querySelector(".todo-box-checked").classList.add("hidden");
    item.querySelector(".todo-box").classList.remove("hidden");
  }

  removeItem(item) {
    if (item.previousElementSibling) {
      item.remove();
    }
    if (item.previousElementSibling === null) {
      this.#clearTextFromItem(item);
      this.#showEmptyCheckbox(item);
    }
  }

  focusList(list) {
    document
      .querySelectorAll(".todo-item")
      .forEach((el) => el.classList.remove("focused"));
    list.classList.add("focused");
  }

  focusItem(element) {
    element.querySelector(".todo-item-text").focus();
  }

  toggleOptionsEl(element) {
    element.classList.toggle("hidden");
  }

  closeAllOptionsEl() {
    document
      .querySelectorAll(".list-options-container")
      .forEach((el) => el.classList.add("hidden"));
  }

  toggleOverlay() {
    this.overlay.classList.remove("hidden");
  }

  addList() {
    this.addListContainer.insertAdjacentHTML("beforebegin", todoItem);
  }

  isListAlreadyBeingDisplayed(id) {
    const lists = [...this.todoSection.querySelectorAll(".todo-item")];
    return lists.some((list) => list.dataset.id === id);
  }

  #spanExtraRowsIfBig() {
    const lists = [...document.querySelectorAll(".todo-item")];
    lists.forEach((list) => {
      const height = list.offsetHeight;
      const rows = Math.round(height / 10);
      list.style.gridRow = `span ${rows}`;
    });
  }

  renderSelectedList(listData) {
    const { title, id, listItems, color, pinned } = listData;
    if (this.isListAlreadyBeingDisplayed(id)) return;

    const markup = `
      <div class="todo-item" data-id="${id}">
        <div class="todo-item-icon-container">
            <i class="ph-push-pin pinned-list-icon-top ${
              !pinned && "hidden"
            } "></i>
            <i class="ph-x close-list-icon"></i>
          </div>
        <div contenteditable="true" class="todo-title" data-color="${color}" >${title}</div>
        <div class="todo-body">
          <div class="todo-items-container">
            ${listItems
              .map(
                (item) => `
                <div class="todo-item-container">
                  <div class="todo-checkbox-container">
                    <i class="ph-check-square checkbox todo-box-checked ${
                      !item.checked && "hidden"
                    }"></i>
                    <i class="ph-square checkbox todo-box ${
                      item.checked && "hidden"
                    }"></i>
                  </div>
                  <div class="todo-item-text ${
                    item.checked && "line-through"
                  }" contenteditable="true">${item.text}</div>
                  <i class="ph-minus-circle remove-item-icon"></i>
                </div>
              `
              )
              .join("")}
          </div>
          <div class="add-item-container">
            <i class="ph-plus-circle add-item-icon"></i>
            <span class="add-item-icon">add another item...</span>
          </div>
          <div class="remove-checked-items-container">
                <i class="ph-minus-circle remove-checked-items-icon"></i>
              <span>remove checked items...</span>
            </div>

        </div>
        <i class="ph-dots-three-vertical-bold list-options-icon"></i>
          <div class="list-options-container hidden">
            <div class="list-options-item list-option-color">
              <i class="ph-palette"></i>
              <div class="color-container">
                <div class="pick-color" data-color="red"></div>
                <div class="pick-color" data-color="orange"></div>
                <div class="pick-color" data-color="yellow"></div>
                <div class="pick-color" data-color="green"></div>
                <div class="pick-color" data-color="blue"></div>
                <div class="pick-color" data-color="purple"></div>
                <div class="pick-color" data-color="black"></div>
                <div class="pick-color" data-color="white"></div>
              </div>
            </div>
            <div class="list-options-item list-option-pin ">
              <i class="ph-push-pin hidden list-options-pin-icon"></i>
              <i class="ph-push-pin-fill list-options-pin-icon "></i>
              <span>Pin List</span>
            </div>
            <div class="list-options-item list-option-delete">
              <i class="ph-trash delete-note-icon"></i>
              <span>Delete List</span>
            </div>
          </div>        
        </div>
      </div>
    `;

    this.addListContainer.insertAdjacentHTML("beforebegin", markup);
    this.#spanExtraRowsIfBig();
    const list = this.addListContainer.previousElementSibling;
    this.changeColor(list, color);
  }

  clearTodoLists() {
    let list = this.addListContainer.previousElementSibling;
    while (list) {
      list.remove();
      list = this.addListContainer.previousElementSibling;
    }
  }

  getListData(list) {
    const id = list.dataset.id;
    const title = list.querySelector(".todo-title").textContent;
    const color = list.querySelector(".todo-title").dataset.color;
    const pinned = !list
      .querySelector(".pinned-list-icon-top")
      .classList.contains("hidden");
    const listItemsEl = list.querySelectorAll(".todo-item-container");
    const listItems = [...listItemsEl].map((element) => {
      const checked = element
        .querySelector(".todo-box")
        .classList.contains("hidden");
      const text = element.querySelector(".todo-item-text").textContent;
      return {
        checked,
        text,
      };
    });
    return {
      id,
      title,
      pinned,
      color,
      listItems,
    };
  }

  setIdToList(list, id) {
    list.dataset.id = id;
  }

  setColorToList(list, color) {
    list.querySelector(".todo-title").dataset.color = color;
  }

  changeColor(list, color) {
    list.style.backgroundColor = color;
    list.style.border = `2px solid ${color}`;
    switch (color) {
      case "red":
      case "purple":
      case "blue":
      case "black":
      case "green":
        list.style.color = "white";
        return;
      case "white":
      case "yellow":
      case "orange":
        list.style.color = "black";
        return;
      default:
        return;
    }
  }

  changeGridLayout(numColumns) {
    this.todoSection.classList.remove("grid-1", "grid-2", "grid-3");
    this.todoSection.classList.add(`grid-${numColumns}`);
  }

  #removeCheckedItems(list) {
    const listItems = [...list.querySelectorAll(".todo-item-text")];
    listItems
      .filter((item) => item.classList.contains("line-through"))
      .forEach((item) => item.closest(".todo-item-container").remove());
  }

  #togglePinInListOptions(list) {
    list
      .querySelectorAll(".list-options-pin-icon")
      .forEach((el) => el.classList.toggle("hidden"));
  }

  #togglePinInListTop(list) {
    list.querySelector(".pinned-list-icon-top").classList.toggle("hidden");
  }

  showPinnedLists(listsData) {
    listsData.forEach((listData) => {
      this.renderSelectedList(listData);
    });
  }

  // Handlers

  addHandlerToggleCheckbox(handler) {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("checkbox")) return;
      const item = e.target.closest(".todo-item-container");
      this.toggleCheckbox(e.target);
      this.toggleStrikeThrough(item);

      const list = this.#selectList(e.target);
      const listData = this.getListData(list);
      handler(listData);
    });
  }

  #addHandlerAddListItem() {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("add-item-icon")) return;
      const list = this.#selectList(e.target);
      const todoItemsContainer = list.querySelector(".todo-items-container");
      this.addNewLine(todoItemsContainer, "beforeend");
      const newItem = this.#selectNewListItem(todoItemsContainer);
      this.focusItem(newItem);
      this.#spanExtraRowsIfBig();
    });
  }

  addHandlerRemoveListItem(handler) {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("remove-item-icon")) return;
      const item = e.target.closest(".todo-item-container");
      const list = this.#selectList(e.target);
      this.removeItem(item);
      this.#spanExtraRowsIfBig();

      const listData = this.getListData(list);
      handler(listData);
    });
  }

  #addHandlerFocusOnSelectedList() {
    this.todoSection.addEventListener("click", (e) => {
      const list = this.#selectList(e.target);
      if (!list) return;
      this.focusList(list);
    });
  }

  #addHandlerPressEnterOnListItem() {
    this.todoSection.addEventListener("keydown", (e) => {
      if (!e.target.classList.contains("todo-item-text")) return;
      if (e.key !== "Enter") return;
      e.preventDefault();
      const element = e.target.closest(".todo-item-container");
      this.addNewLine(element, "afterend");
      const newElement = element.nextElementSibling;
      this.focusItem(newElement);
    });
  }

  #addHandlerListToggleListOptions() {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("list-options-icon")) return;

      const optionsEl = e.target.nextElementSibling;
      this.toggleOptionsEl(optionsEl);
      this.toggleOverlay();
    });
  }

  #addHandlerClickOverlay() {
    this.overlay.addEventListener("click", () => {
      this.closeAllOptionsEl();
    });
  }

  addHandlerSaveListOnFocusOut(handler) {
    this.todoSection.addEventListener("focusout", (e) => {
      const list = this.#selectList(e.target);
      const listData = this.getListData(list);
      const newId = handler(listData);

      if (newId) this.setIdToList(list, newId);
    });
  }

  addHandlerAddNewList(handler) {
    this.iconAddList.addEventListener("click", handler);
  }

  addHandlerChooseColor(handler) {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("pick-color")) return;
      const color = e.target.dataset.color;
      const list = this.#selectList(e.target);
      this.setColorToList(list, color);
      this.changeColor(list, color);
      const listData = this.getListData(list);
      handler(listData);
    });
  }

  #addHandlerCloseList() {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("close-list-icon")) return;
      const list = this.#selectList(e.target);
      list.remove();
    });
  }

  addHandlerDeleteList(handler) {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.closest(".list-option-delete")) return;

      const list = this.#selectList(e.target);
      const id = list.dataset.id;
      handler(id);
      list.remove();
    });
  }

  addHandlerRemoveCheckedItems(handler) {
    this.todoSection.addEventListener("click", (e) => {
      const removeCheckedItemsContainer = e.target.closest(
        ".remove-checked-items-container"
      );
      if (!removeCheckedItemsContainer) return;

      const list = this.#selectList(e.target);
      this.#removeCheckedItems(list);
      const listData = this.getListData(list);
      handler(listData);
    });
  }

  addHandlerTogglePinOnList(handler) {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.closest(".list-option-pin")) return;

      const list = this.#selectList(e.target);
      this.#togglePinInListOptions(list);
      this.#togglePinInListTop(list);
      const listData = this.getListData(list);
      handler(listData);
    });
  }
}

export default new TodoView();

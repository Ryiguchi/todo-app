"use strict";

import { todoItem } from "../templates/templates";

class TodoView {
  todoSection = document.querySelector(".todo-section");
  checkboxContainer = document.querySelector(".task__checkbox-container");
  todoItemsContainer = document.querySelector(".todo-list__body");
  checkboxEmpty = document.querySelector(".task__icon--box");
  checkboxChecked = document.querySelector(".task__icon--checkbox");
  addItemIcon = document.querySelector(".add-item__icon");
  removeItemIcon = document.querySelector(".task__icon--delete");
  addItemContainer = document.querySelector(".add-item");
  listOptionsIcons = document.querySelectorAll(
    ".todo-list__icon--list-options"
  );
  listOptionsContainers = document.querySelectorAll(".list-options");
  allTodoLists = document.querySelectorAll(".todo-list");
  overlay = document.querySelector(".overlay");
  iconAddList = document.querySelector(".add-list__icon");
  addListContainer = document.querySelector(".add-list");

  constructor() {
    this.#addHandlerFocusOnSelectedList();
    this.#addHandlerAddListItem();
    this.#addHandlerPressEnterOnListItem();
    this.#addHandlerListToggleListOptions();
    this.#addHandlerClickOverlay();
    this.#addHandlerCloseList();
  }

  #selectList(element) {
    return element.closest(".todo-list");
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

  toggleCheckbox(listItemContainer) {
    listItemContainer
      .querySelectorAll(".checkbox")
      .forEach((el) => el.classList.toggle("hidden"));
  }

  #showCheckboxAndStrikeThrough(listItemContainer) {
    listItemContainer
      .querySelector(".task__icon--checkbox")
      .classList.remove("hidden");
    listItemContainer.querySelector(".task__icon--box").classList.add("hidden");
    listItemContainer
      .querySelector(".task__text")
      .classList.add("line-through");
  }

  #hideCheckboxAndStrikeThrough(listItemContainer) {
    listItemContainer
      .querySelector(".task__icon--checkbox")
      .classList.add("hidden");
    listItemContainer
      .querySelector(".task__icon--box")
      .classList.remove("hidden");
    listItemContainer
      .querySelector(".task__text")
      .classList.remove("line-through");
  }

  toggleStrikeThrough(listItemContainer) {
    listItemContainer
      .querySelector(".task__text")
      .classList.toggle("line-through");
  }

  addNewLine(element, placement) {
    const markup = `
      <div class="task">
        <div class="task__checkbox-container">
          <i class="ph-check-square checkbox task__icon  task__icon--checkbox hidden"></i>
          <i class="ph-square checkbox  task__icon task__icon--box"></i>
        </div>
        <div class="task__text" contenteditable="true" ></div>
        <i class="ph-minus-circle  task__icon task__icon--delete"></i>
      </div>
    `;

    element.insertAdjacentHTML(placement, markup);
  }

  #clearTextFromItem(item) {
    item.querySelector(".task__text").textContent = "";
  }

  #showEmptyCheckbox(item) {
    item.querySelector(".task__icon--checkbox").classList.add("hidden");
    item.querySelector(".task__icon--box").classList.remove("hidden");
  }

  removeItem(item) {
    if (
      item.previousElementSibling ||
      item.nextElementSibling?.classList.contains("task")
    ) {
      item.remove();
    }
    if (item.previousElementSibling === null) {
      this.#clearTextFromItem(item);
      this.#showEmptyCheckbox(item);
    }
  }

  focusList(list) {
    document
      .querySelectorAll(".todo-list")
      .forEach((el) => el.classList.remove("focused"));
    list.classList.add("focused");
  }

  focusItem(element) {
    element.querySelector(".task__text").focus();
  }

  toggleOptionsEl(element) {
    element.classList.toggle("hidden");
  }

  closeAllOptionsEl() {
    document
      .querySelectorAll(".list-options")
      .forEach((el) => el.classList.add("hidden"));
  }

  #toggleOverlay() {
    this.overlay.classList.toggle("hidden");
  }

  addList() {
    this.addListContainer.insertAdjacentHTML("beforebegin", todoItem);
  }

  isListAlreadyBeingDisplayed(id) {
    const lists = [...this.todoSection.querySelectorAll(".todo-list")];
    return lists.some((list) => list.dataset.id === id);
  }

  #spanExtraRowsIfBig() {
    const lists = [...document.querySelectorAll(".todo-list")];
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
      <div class="todo-list" data-id="${id}">
        <div class="todo-list__icon-container">
          <i class="ph-push-pin  todo-list__icon todo-list__icon--pin ${
            !pinned && "hidden"
          }"></i>
          <i class="ph-x todo-list__icon todo-list__icon--close-section"></i>
        </div>
                   
        <h2 contenteditable="true" class="todo-list__title" data-color="${color}" >${title}</h2>
        <div class="todo-list__body">
            ${listItems
              .map(
                (item) => `
              <div class="task">
                <div class="task__checkbox-container">
                  <i class="ph-check-square checkbox task__icon  task__icon--checkbox ${
                    !item.checked && "hidden"
                  }"></i>
                  <i class="ph-square checkbox  task__icon task__icon--box ${
                    item.checked && "hidden"
                  }"></i>
                </div>
                <div class="task__text ${
                  item.checked && "line-through"
                }" contenteditable="true">${item.text}</div>
                <i class="ph-minus-circle task__icon task__icon--delete"></i>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="add-item">
            <i class="ph-plus-circle add-item__icon"></i>
            <span class="add-item__text">add another item...</span>
          </div>
            
        <i class="ph-dots-three-vertical-bold todo-list__icon--list-options"></i>
        <div class="list-options hidden">
          <div class="list-options__item list-options__item--color">
            <i class="ph-palette list-options__icon--palette"></i>
            <div class="list-options__color">
              <div class="list-options__pick-color" data-color="red"></div>
              <div class="list-options__pick-color" data-color="orange"></div>
              <div class="list-options__pick-color" data-color="yellow"></div>
              <div class="list-options__pick-color" data-color="green"></div>
              <div class="list-options__pick-color" data-color="blue"></div>
              <div class="list-options__pick-color" data-color="purple"></div>
              <div class="list-options__pick-color" data-color="black"></div>
              <div class="list-options__pick-color" data-color="white"></div>
            </div>
          </div>
          <div class="list-options__item list-options__item--pin ">
            <i class="ph-push-pin  list-options__icon--pin ${
              pinned && "hidden"
            }"></i>
            <i class="ph-push-pin-fill ${
              !pinned && "hidden"
            } list-options__icon--pin "></i>
            <span>Pin List</span>
          </div>
          <div class="list-options__item list-options__item--check-all">
              <i class="ph-check-square list-options__icon--checkbox"></i>
            <span>Check/uncheck all items</span>
          </div>
          <div class="list-options__item list-options__item--remove-checked">
              <i class="ph-minus-circle list-options__icon--minus"></i>
            <span>Remove checked items</span>
          </div>
          <div class="list-options__item list-options__item--delete">
            <i class="ph-trash list-options__icon--trash"></i>
            <span>Delete List</span>
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
    const title = list.querySelector(".todo-list__title").textContent;
    const color = list.querySelector(".todo-list__title").dataset.color;
    const pinned = !list
      .querySelector(".todo-list__icon--pin")
      .classList.contains("hidden");
    const listItemsEl = list.querySelectorAll(".task");
    const listItems = [...listItemsEl].map((element) => {
      const checked = element
        .querySelector(".task__icon--box")
        .classList.contains("hidden");
      const text = element.querySelector(".task__text").textContent;
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
    list.querySelector(".todo-list__title").dataset.color = color;
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
    const listItems = [...list.querySelectorAll(".task__text")];
    listItems
      .filter((item) => item.classList.contains("line-through"))
      .forEach((item) => item.closest(".task").remove());
  }

  #checkAllItems(list) {
    const listItems = [...list.querySelectorAll(".task")];
    const anyChecked = listItems
      .map((item) => item.querySelector(".task__icon--box"))
      .some((checkbox) => checkbox.classList.contains("hidden"));
    console.log(anyChecked);
    listItems.forEach((item) => {
      if (!anyChecked) this.#showCheckboxAndStrikeThrough(item);
      if (anyChecked) this.#hideCheckboxAndStrikeThrough(item);
    });
  }

  #togglePinInListOptions(list) {
    list
      .querySelectorAll(".list-options__icon--pin")
      .forEach((el) => el.classList.toggle("hidden"));
  }

  #togglePinInListTop(list) {
    list.querySelector(".todo-list__icon--pin").classList.toggle("hidden");
  }

  showPinnedLists(listsData) {
    listsData.forEach((listData) => {
      this.renderSelectedList(listData);
    });
    this.#spanExtraRowsIfBig();
  }

  #closeOptionsMenu(list) {
    const menu = list.querySelector(".list-options");
    this.toggleOptionsEl(menu);
    this.#toggleOverlay();
  }

  // Handlers

  addHandlerToggleCheckbox(handler) {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("checkbox")) return;
      const listItemContainer = e.target.closest(".task");
      this.toggleCheckbox(listItemContainer);
      this.toggleStrikeThrough(listItemContainer);

      const list = this.#selectList(e.target);
      const listData = this.getListData(list);
      handler(listData);
    });
  }

  #addHandlerAddListItem() {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("add-item__icon")) return;
      const list = this.#selectList(e.target);
      const todoItemsContainer = list.querySelector(".todo-list__body");
      this.addNewLine(todoItemsContainer, "beforeend");
      const newItem = this.#selectNewListItem(todoItemsContainer);
      this.focusItem(newItem);
      this.#spanExtraRowsIfBig();
    });
  }

  addHandlerRemoveListItem(handler) {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("task__icon--delete")) return;
      const item = e.target.closest(".task");
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
      if (!e.target.classList.contains("task__text")) return;
      if (e.key !== "Enter") return;
      e.preventDefault();
      const element = e.target.closest(".task");
      this.addNewLine(element, "afterend");
      const newElement = element.nextElementSibling;
      this.focusItem(newElement);
    });
  }

  #addHandlerListToggleListOptions() {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("todo-list__icon--list-options")) return;

      const optionsEl = e.target.nextElementSibling;
      this.toggleOptionsEl(optionsEl);
      this.#toggleOverlay();
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
      if (!e.target.classList.contains("list-options__pick-color")) return;
      const color = e.target.dataset.color;
      const list = this.#selectList(e.target);
      this.setColorToList(list, color);
      this.changeColor(list, color);
      const listData = this.getListData(list);

      handler(listData);

      this.#closeOptionsMenu(list);
    });
  }

  #addHandlerCloseList() {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("todo-list__icon--close-list")) return;
      const list = this.#selectList(e.target);
      list.remove();
    });
  }

  addHandlerDeleteList(handler) {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.closest(".list-options__item--delete")) return;

      const list = this.#selectList(e.target);
      const id = list.dataset.id;
      handler(id);
      list.remove();
    });
  }

  addHandlerRemoveCheckedItems(handler) {
    this.todoSection.addEventListener("click", (e) => {
      const removeCheckedItemsContainer = e.target.closest(
        ".list-options__item--remove-checked"
      );
      if (!removeCheckedItemsContainer) return;

      const list = this.#selectList(e.target);
      this.#removeCheckedItems(list);
      const listData = this.getListData(list);
      handler(listData);

      this.#closeOptionsMenu(list);
    });
  }

  addHandlerCheckAllItems(handler) {
    this.todoSection.addEventListener("click", (e) => {
      const checkAllItemsContainer = e.target.closest(
        ".list-options__item--check-all"
      );
      if (!checkAllItemsContainer) return;

      const list = this.#selectList(e.target);
      this.#checkAllItems(list);
      const listData = this.getListData(list);

      handler(listData);

      this.#closeOptionsMenu(list);
    });
  }

  addHandlerTogglePinInListOptions(handler) {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.closest(".list-options__item--pin")) return;

      const list = this.#selectList(e.target);
      this.#togglePinInListOptions(list);
      this.#togglePinInListTop(list);
      const listData = this.getListData(list);

      handler(listData);

      this.#closeOptionsMenu(list);
    });
  }

  addHandlerTogglePinOnListTop(handler) {
    this.todoSection.addEventListener("click", (e) => {
      if (!e.target.classList.contains("todo-list__icon--pin")) return;

      const list = this.#selectList(e.target);
      this.#togglePinInListOptions(list);
      this.#togglePinInListTop(list);
      const listData = this.getListData(list);

      handler(listData);

      this.#closeOptionsMenu(list);
    });
  }
}

export default new TodoView();

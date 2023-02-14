export const todoItem = `
  <div class="todo-list">
    <div class="todo-list__icon-container">
      <i class="ph-push-pin  todo-list__icon todo-list__icon--pin hidden"></i>
      <i class="ph-x todo-list__icon todo-list__icon--close-list"></i>
    </div>
              
    <h2 contenteditable="true" class="todo-list__title" data-color="white" >Untitled List</h2>
    <div class="todo-list__body">
      <div data-id=${Date.now().toString()} class="task">
        <div class="task__checkbox-container">
          <i class="ph-check-square checkbox task__icon  task__icon--checkbox hidden"></i>
          <i class="ph-square checkbox  task__icon task__icon--box"></i>
        </div>
        <div class="task__text" contenteditable="true" ></div>
        <i class="ph-minus-circle  task__icon task__icon--delete"></i>
      </div>
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
        <i class="ph-push-pin  list-options__icon--pin"></i>
        <i class="ph-push-pin-fill hidden list-options__icon--pin "></i>
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

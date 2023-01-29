export const todoItem = `
  <div class="todo-item">
          <div class="todo-item-icon-container">
            <i class="ph-push-pin pinned-list-icon-top hidden"></i>
            <i class="ph-x close-list-icon"></i>
          </div>
                   
          <div contenteditable="true" class="todo-title" data-color="white" >Untitled List</div>
          <div class="todo-body">
            <div class="todo-items-container">           
              <div class="todo-item-container">
                <div class="todo-checkbox-container">
                  <i class="ph-check-square checkbox todo-box-checked hidden"></i>
                  <i class="ph-square checkbox todo-box"></i>
                </div>
                <div class="todo-item-text" contenteditable="true" ></div>
                <i class="ph-minus-circle remove-item-icon"></i>
              </div>
            </div>
            <div class="add-item-container">
              <i class="ph-plus-circle add-item-icon"></i>
              <span>add another item...</span>
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
`;

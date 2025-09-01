const todoForm = document.querySelector(".todo_form");
let todoInput = document.querySelector(".form_input");
let todoListGroup = document.querySelector(".list_group");
const todosCount = document.querySelector(".todo_count span");

let todos = [];
let todoInitialId = 0;

function TodoPrototype(text, id) {
  this.id = id;
  this.text = text;
}
// ///////////////////////////////////////////////ochiriw
function removeTodo(todoId) {
  let i = document.querySelector(`.data_todo_id${todoId}`);
  if (i) {
    i.remove();
    todos = todos.filter((todo) => todo.id !== todoId);
    todosCount.textContent = todos.length;
  }
}
// ///////////////////////////////////////////// htmlga jiqiwi
function todoCreateDom(todoText, todoId) {
  let listItem = document.createElement("li");
  let deleteBtn = document.createElement("button");
  let editInp = document.createElement("input");

  listItem.classList.add("list_group_item");
  listItem.classList.add(`data_todo_id${todoId}`);
  // //////////////////////////////////////////// e\inp
  editInp.value = todoText;
  editInp.classList.add("edit_input");
  editInp.disabled = true;

  deleteBtn.classList.add("btn_delet");
  deleteBtn.textContent = "O'chirish";
  // ////////////////////////////////////////////// editInp 2mart
  listItem.addEventListener("dblclick", function () {
    editInp.disabled = false;
    editInp.focus();
  });
  // ///////////////////////////////////////////////////// enter saqlash
  editInp.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      if (editInp.value.trim().length > 0) {
        saveEdit();
        editInp.style.borderBottom = "1px solid transparent";
      } else {
        editInp.style.borderBottom = "1px solid red";
      }
    }
  });
  // /////////////////////////////////////////// blur && saqlw
  editInp.addEventListener("blur", saveEdit);

  function saveEdit() {
    if (editInp.value.trim().length > 0) {
      editInp.disabled = true;
      let todo = todos.find((t) => t.id === todoId);
      if (todo) {
        todo.text = editInp.value;
      }
    }
  }
  // //////////////////////////////// delte
  deleteBtn.addEventListener("click", function () {
    removeTodo(todoId);
  });
  // ///////////////////////////// qowiwi
  listItem.appendChild(editInp);
  listItem.appendChild(deleteBtn);
  todoListGroup.appendChild(listItem);
}
// ////////////////////////////////////////////// vazifa
function todoCreate(todoText, todoId) {
  todoCreateDom(todoText, todoId);
  todos.push(new TodoPrototype(todoText, todoId));
  todosCount.textContent = todos.length;
}
// ////////////////////////////// forma
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (todoInput.value.trim() === "") return;

  todoCreate(todoInput.value, todoInitialId++);
  todoForm.reset();
});

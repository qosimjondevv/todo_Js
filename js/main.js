const todoForm = document.querySelector(".todo_form");
let todoInput = document.querySelector(".form_input");
const todoClect = document.querySelector(".form_select");
const todosCount = document.querySelector(".todo_count span");

let todos = [];
let todoInitialId = 0;

function TodoPrototype(text, id, category) {
  this.id = id;
  this.text = text;
  this.category = category;
}

// /////////////////////////////////////////////// ochirish
function removeTodo(todoId) {
  let el = document.querySelector(`.data_todo_id${todoId}`);
  if (el) el.remove();
  todos = todos.filter((t) => t.id !== todoId);
  todosCount.textContent = todos.length;
}

// ///////////////////////////////////////////// DOMga qo‘shish
function todoCreateDom(todoText, todoId, category) {
  let listItem = document.createElement("li");
  let deleteBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let textSpan = document.createElement("span");

  listItem.classList.add("list_group_item");
  listItem.classList.add(`data_todo_id${todoId}`);

  // /////////////////////////////////////////////////matn qowiw
  textSpan.textContent = todoText;
  textSpan.classList.add("todo_text");

  // ///////////////////////////////////////////////////////Edit && delet btn
  editBtn.classList.add("btn_edit");
  editBtn.textContent = "Edit";
  deleteBtn.classList.add("btn_delet");
  deleteBtn.textContent = "O'chirish";

  // ////////////////////////////////////////////// categorita kanterner
  let targetDiv;
  if (category === "easy") targetDiv = document.querySelector(".easy_todo");
  else if (category === "medium")
    targetDiv = document.querySelector(".medium_todo");
  else if (category === "high")
    targetDiv = document.querySelector(".high_todo");

  let placeholder = targetDiv.querySelector(".placeholder");
  if (placeholder) {
    placeholder.remove();
  }

  targetDiv.appendChild(listItem);

  // ////////////////////////////////////// listItemga ulaw qowiw
  listItem.appendChild(textSpan);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);

  // ////////////////////////////////////////edit tugmasi bosilganda
  editBtn.addEventListener("click", function () {
    if (editBtn.textContent === "Edit") {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = textSpan.textContent;
      editInput.classList.add("edit_input");

      if (listItem.contains(textSpan)) {
        listItem.replaceChild(editInput, textSpan);
      }

      editBtn.textContent = "Save";
      editInput.focus();

      // ////////////////////////////////////////////////enter bosilganda ham saqlash
      editInput.addEventListener("keydown", function handler(e) {
        if (e.key === "Enter") {
          saveEdit(editInput);
          editInput.removeEventListener("keydown", handler);
        }
      });
    } else if (editBtn.textContent === "Save") {
      let inpEl = listItem.querySelector(".edit_input");
      if (inpEl) {
        saveEdit(inpEl);
      }
    }
  });

  //////////////////////////////////////////////////////////// saqlash funksia
  function saveEdit(inpEl) {
    let newText = inpEl.value.trim();
    if (newText.length === 0) {
      inpEl.style.borderBottom = "2px solid red";
      inpEl.focus();
      return;
    }

    const newSpan = document.createElement("span");
    newSpan.textContent = newText;
    newSpan.classList.add("todo_text");

    let todo = todos.find((i) => i.id === todoId);
    if (todo) todo.text = newText;

    if (listItem.contains(inpEl)) {
      listItem.replaceChild(newSpan, inpEl);
    }

    textSpan = newSpan;

    editBtn.textContent = "Edit";
  }

  // ////////////////////////////////////////// delete btn bosil
  deleteBtn.addEventListener("click", function () {
    removeTodo(todoId);
  });
}

// ////////////////////////////////////////////// vazifa jiqaradi yangilaydi
function todoCreate(todoText, todoId, category) {
  todoCreateDom(todoText, todoId, category);
  todos.push(new TodoPrototype(todoText, todoId, category));
  todosCount.textContent = todos.length;
}

// ////////////////////////////// forma submit
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (todoInput.value.trim() === "") {
    todoInput.style.borderBottom = "2px solid red";
    todoInput.focus();
    return;
  }
  let selectCategoriya = todoClect.value;

  todoCreate(todoInput.value, todoInitialId++, selectCategoriya);
  todoForm.reset();
  todoInput.style.borderBottom = "";
});

document.addEventListener("DOMContentLoaded", loadTodos);

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load todos from localStorage
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    addTodoToDOM(todo);
  });
}

// Add a new todo
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText) {
    const todo = { text: todoText };
    addTodoToDOM(todo);
    saveTodoToLocalStorage(todo);
    input.value = "";
  }
});

// Add todo to the DOM
function addTodoToDOM(todo) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span class="todo-text">${todo.text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
  todoList.appendChild(li);

  // Add event listener for edit button
  li.querySelector(".edit-btn").addEventListener("click", function () {
    const span = li.querySelector(".todo-text");
    const newText = prompt("Edit your task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      updateTodoInLocalStorage(todo.text, newText.trim());
      todo.text = newText.trim(); // Update todo object
    }
  });

  // Add event listener for delete button
  li.querySelector(".delete-btn").addEventListener("click", function () {
    todoList.removeChild(li);
    removeTodoFromLocalStorage(todo.text);
  });
}

// Save todo to localStorage
function saveTodoToLocalStorage(todo) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove todo from localStorage
function removeTodoFromLocalStorage(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => todo.text !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

// Update todo in localStorage
function updateTodoInLocalStorage(oldText, newText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.map((todo) => {
    if (todo.text === oldText) {
      todo.text = newText;
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

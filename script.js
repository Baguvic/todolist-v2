const icon = document.getElementById("long");
const formInput = document.querySelector(".form-input");
const tanggal = document.getElementById("tanggal");
const dayhere = document.getElementById("day");
const bulan = document.getElementById("moth");
const listInput = document.getElementById("input-list");
const pushBtn = document.getElementById("push");
const listUl = document.querySelector(".list");
const filterUl = document.querySelector(".filter");
// nav form
icon.addEventListener("click", function (event) {
  event.preventDefault();
  formInput.classList.toggle("active");
  event.stopPropagation();
});

document.addEventListener("click", function (event) {
  event.preventDefault();
  const clickInsideFormInput = formInput.contains(event.target);
  if (!clickInsideFormInput) {
    formInput.classList.remove("active");
  }
});

// tanggal
let currentDate = new Date();
let day = currentDate.getDay();
let tgl = currentDate.getDate();
let moth = currentDate.getMonth();
let year = currentDate.getFullYear();

let haris = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let mothNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let hari = haris[day];
let mothName = mothNames[moth];
tanggal.innerHTML = tgl;
dayhere.innerHTML = hari;
bulan.innerHTML = `${mothName}, ${year}`;

document.addEventListener("DOMContentLoaded", getTodos);
pushBtn.addEventListener("click", addTodo);
listUl.addEventListener("click", deleteCheck);
filterUl.addEventListener("click", filterTodo);

function addTodo(event) {
  event.preventDefault();

  const inputValue = listInput.value;
  if (!inputValue.trim()) {
    alert("harus di isi");
    return;
  }

  const todov = document.createElement("li");
  todov.classList.add("todo");
  const title = document.createElement("h6");
  title.innerText = inputValue;
  saveLocalTodos(inputValue);
  const action = document.createElement("div");
  action.classList.add("action");
  const btnCheck = document.createElement("button");
  btnCheck.classList.add("checked");
  btnCheck.innerHTML = '<i class="bi bi-check-square-fill"></i>';
  const btnTrash = document.createElement("button");
  btnTrash.classList.add("delete");
  btnTrash.innerHTML = '<i class="bi bi-trash-fill"></i>';
  action.append(btnCheck, btnTrash);
  todov.append(title, action);
  listUl.appendChild(todov);

  listInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  console.log(item);

  // delete
  if (item.classList.contains("delete")) {
    const todo = item.parentElement.parentElement;
    removeLocalTodo(todo);
    todo.remove();
  }

  // checked
  if (item.classList.contains("checked")) {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = listUl.children;

  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  for (const todo of todos) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.style.display = todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
      case "uncompleted":
        todo.style.display = !todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
    }
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todov = document.createElement("li");
    todov.classList.add("todo");
    const title = document.createElement("h6");
    title.innerText = todo;
    const action = document.createElement("div");
    action.classList.add("action");
    const btnCheck = document.createElement("button");
    btnCheck.classList.add("checked");
    btnCheck.innerHTML = '<i class="bi bi-check-square-fill"></i>';
    const btnTrash = document.createElement("button");
    btnTrash.classList.add("delete");
    btnTrash.innerHTML = '<i class="bi bi-trash-fill"></i>';
    action.append(btnCheck, btnTrash);
    todov.append(title, action);
    listUl.appendChild(todov);
  });
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

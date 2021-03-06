//Selectors are use to call the elements in html
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listener are use to define some action 
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);



//Functions  are use to actully do the action
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault(); // Page dont update

    //Todo DIV
    const todoDiv = document.createElement("div"); //Create div
    todoDiv.classList.add("todo"); //Add class to div

    // Create LI
    const newTodo = document.createElement("li"); //Create li
    newTodo.innerText = todoInput.value; // Add text inside li
    newTodo.classList.add("todo-item"); //add class to li
    todoDiv.appendChild(newTodo); // Put li inside div

    //Add todo to localStorage
    saveLocalTodos(todoInput.value);

    //Check Mark Button
    const completedButton = document.createElement("button") //Create Button
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; //Add inside the button an icon from font awesome
    completedButton.classList.add("complete-btn") //Add class to button
    todoDiv.appendChild(completedButton); //Put button inside Div

    //Check Trash Button
    const trashButton = document.createElement("button") //Create Button
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //Add inside the button an icon from font awesome
    trashButton.classList.add("trash-btn") //Add class to button
    todoDiv.appendChild(trashButton); //Put button inside Div

    //Append to list
    todoList.appendChild(todoDiv); //Put todoList inside Div

    //Clear todo Input value
    todoInput.value = "";
};

function deleteCheck(event) {
    const item = event.target //Target the items

    //Delete todo
    if (item.classList[0] === "trash-btn") {       //Remove the line
        const todo = item.parentElement;           //Remove the line
        //Animation
        todo.classList.add("fall");                // Add class fall
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    };

    //Check Mark
    if (item.classList[0] === "complete-btn") {    //Mark the line as completed
        const todo = item.parentElement;           //Mark the line as completed
        todo.classList.toggle("completed");        //Mark the line as completed
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

function saveLocalTodos(todo) {
    //Check if there is previous todos list
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];  // If we dont have it create it
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // If we already have it will be called back
    }
    //Saving in localStorage
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //Check if there is previous todos list
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];  // If we dont have it create it
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // If we already have it will be called back
    }
    todos.forEach(function (todo) {
        //Todo DIV
        const todoDiv = document.createElement("div"); //Create div
        todoDiv.classList.add("todo"); //Add class to div

        // Create LI
        const newTodo = document.createElement("li"); //Create li
        newTodo.innerText = todo; // Add text inside li
        newTodo.classList.add("todo-item"); //add class to li
        todoDiv.appendChild(newTodo); // Put li inside div

        //Check Mark Button
        const completedButton = document.createElement("button") //Create Button
        completedButton.innerHTML = '<i class="fas fa-check"></i>'; //Add inside the button an icon from font awesome
        completedButton.classList.add("complete-btn") //Add class to button
        todoDiv.appendChild(completedButton); //Put button inside Div

        //Check Trash Button
        const trashButton = document.createElement("button") //Create Button
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //Add inside the button an icon from font awesome
        trashButton.classList.add("trash-btn") //Add class to button
        todoDiv.appendChild(trashButton); //Put button inside Div

        //Append to list
        todoList.appendChild(todoDiv); //Put todoList inside Div
    });
}

function removeLocalTodos(todo) {
    //Check if there is previous todos list
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];  // If we dont have it create it
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // If we already have it will be called back
    }

    //Removind the line item trhough array splice
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
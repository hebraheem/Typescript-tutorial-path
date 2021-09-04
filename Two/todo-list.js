"use strict";
console.log("todo-list");
var todoList = [];
var todoInput = document.getElementById("todoInput");
var divContainer = document.getElementById("todoListContainer");
function addTodo() {
    if (todoInput === null || todoInput === undefined) {
        console.error("The todo imput is missing on the page");
        return;
    }
    var newTodo = todoInput.value;
    if (todoInput.value.length < 1) {
        alert("Todo can not be empty");
        return;
    }
    if ("" !== newTodo.trim()) {
        console.info("Addign todo: ", newTodo);
        //Add todo to list
        todoList.push(newTodo);
        console.log("current todo list: ", todoList);
        //clear the input
        todoInput.value = "";
    }
    todoList.sort(); //keep todo list sorted
    updateList(); //update todo list
    filterTodo(); //filter todo list
}
function updateList() {
    divContainer.innerHTML = "";
    divContainer.textContent = "";
    var ul = document.createElement("ul");
    ul.setAttribute("id", "todoList");
    divContainer.appendChild(ul);
    todoList.forEach(function (todo) {
        var li = document.createElement("li");
        li.setAttribute("class", "todo-list-item");
        li.innerHTML = "<a href=\"#\" onclick='removeTodoListItem(\"" + todo + "\")'>" + todo + "</a>";
        ul.appendChild(li);
    });
}
function filterTodo() {
    var todoListHtml = document.getElementById("todoList");
    if (todoListHtml === null) {
        console.log("nothing to filter");
        return;
    }
    var todoListFilter = document.getElementById("todoFilter");
    var todoListFilterText = todoListFilter.value.toUpperCase();
    todoListHtml.childNodes.forEach(function (item) {
        var itemText = item.textContent;
        if (itemText !== null) {
            itemText = itemText.toUpperCase();
            if (itemText.startsWith(todoListFilterText)) {
                item.style.display = "block";
            }
            else {
                item.style.display = "none";
            }
        }
    });
}
function removeTodoListItem(itemToRemove) {
    todoList = todoList.filter(function (todo) { return todo !== itemToRemove; });
    updateList();
    filterTodo();
}

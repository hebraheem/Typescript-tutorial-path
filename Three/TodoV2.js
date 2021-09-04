"use strict";
console.log("!!! starting ... all task");
//model
var CreateTodoItem = /** @class */ (function () {
    function CreateTodoItem(_description, identifier) {
        this._description = _description;
        this._creationTime = new Date().getTime();
        if (identifier) {
            this._identifier = identifier;
        }
        else {
            this._identifier = Math.random().toString().substr(2, 9);
        }
    }
    Object.defineProperty(CreateTodoItem.prototype, "creationTime", {
        get: function () {
            return this._creationTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateTodoItem.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateTodoItem.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    return CreateTodoItem;
}());
var TodoList = /** @class */ (function () {
    function TodoList(todoItem) {
        this._todoList = [];
        if (Array.isArray(todoItem) && todoItem.length) {
            this._todoList = this._todoList.concat(todoItem);
        }
    }
    Object.defineProperty(TodoList.prototype, "todoList", {
        get: function () {
            return this._todoList;
        },
        enumerable: false,
        configurable: true
    });
    TodoList.prototype.addTodo = function (todoItemToAdd) {
        if (todoItemToAdd) {
            this._todoList = this._todoList.concat(todoItemToAdd);
        }
    };
    TodoList.prototype.removeTodo = function (todoToRemove) {
        if (todoToRemove) {
            this._todoList = this._todoList.filter(function (item) { return item.identifier !== todoToRemove; });
        }
    };
    return TodoList;
}());
var HTMLTodoListView = /** @class */ (function () {
    function HTMLTodoListView() {
        this._divContainer = document.getElementById("todoListContainer");
        this._filterInput = document.getElementById("todoFilter");
        this._todoInput = document.getElementById("todoInput");
        if (!this._divContainer) {
            throw new Error("Div container missing");
        }
        if (!this._filterInput) {
            throw new Error("Div container missing");
        }
        if (!this._todoInput) {
            throw new Error("Div container missing");
        }
    }
    HTMLTodoListView.prototype.render = function (todoList) {
        this._divContainer.innerHTML = "";
        this._divContainer.textContent = "";
        var ul = document.createElement("ul");
        ul.setAttribute("id", "todoList");
        this._divContainer.appendChild(ul);
        todoList.forEach(function (todo) {
            var li = document.createElement("li");
            li.setAttribute("class", "todo-list-item");
            li.innerHTML = "<a href=\"#\" onclick='todoIt.removeTodo(\"" + todo.identifier + "\")'>" + todo.description + "</a>";
            ul.appendChild(li);
        });
    };
    HTMLTodoListView.prototype.getInput = function () {
        var todoInputValue = this._todoInput.value.trim();
        return new CreateTodoItem(todoInputValue);
    };
    HTMLTodoListView.prototype.getFilter = function () {
        return this._filterInput.value.toUpperCase();
    };
    HTMLTodoListView.prototype.clearInput = function () {
        this._todoInput.value = "";
    };
    HTMLTodoListView.prototype.filter = function () {
        var todoListFilterText = this._filterInput.value.toUpperCase();
        var todoListHTML = document.getElementById("todoList");
        todoListHTML.childNodes.forEach(function (item) {
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
    };
    return HTMLTodoListView;
}());
var todoController = /** @class */ (function () {
    function todoController(_todoListView) {
        this._todoListView = _todoListView;
        this._todoList = new TodoList();
        if (!_todoListView) {
            throw new Error("Todo list can't be empty");
        }
    }
    todoController.prototype.addTodo = function () {
        var newTodo = this._todoListView.getInput();
        if ("" !== newTodo.description) {
            this._todoList.addTodo(newTodo);
            this._todoListView.clearInput();
            this._todoListView.render(this._todoList.todoList);
            this._todoListView.filter();
        }
    };
    todoController.prototype.filterTodo = function () {
        this._todoListView.filter();
    };
    todoController.prototype.removeTodo = function (identifier) {
        if (identifier) {
            this._todoList.removeTodo(identifier);
            this._todoListView.render(this._todoList.todoList);
        }
    };
    return todoController;
}());
//initializing
var view = new HTMLTodoListView();
var todoIt = new todoController(view);
var EventUtils = /** @class */ (function () {
    function EventUtils() {
    }
    EventUtils.isEnter = function (event) {
        var isEnterResult = false;
        if (event !== undefined && event.defaultPrevented) {
            return false;
        }
        if (event == undefined) {
            isEnterResult = false;
        }
        else if (event.key !== undefined) {
            isEnterResult = event.key === "Enter";
        }
        else if (event.keyCode !== undefined) {
            isEnterResult = event.keyCode === 13;
        }
        return isEnterResult;
    };
    return EventUtils;
}());

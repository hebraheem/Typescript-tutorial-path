console.log("todo-list");

let todoList: string[] = [];

const todoInput: HTMLInputElement = document.getElementById(
  "todoInput"
) as HTMLInputElement;
const divContainer: HTMLDivElement = document.getElementById(
  "todoListContainer"
) as HTMLDivElement;

function addTodo(): void {
  if (todoInput === null || todoInput === undefined) {
    console.error("The todo imput is missing on the page");
    return;
  }
  const newTodo: string = todoInput.value;
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

function updateList(): void {
  divContainer.innerHTML = "";
  divContainer.textContent = "";

  const ul = document.createElement("ul");
  ul.setAttribute("id", "todoList");
  divContainer.appendChild(ul);

  todoList.forEach((todo) => {
    const li = document.createElement("li");
    li.setAttribute("class", "todo-list-item");
    li.innerHTML = `<a href="#" onclick='removeTodoListItem("${todo}")'>${todo}</a>`;
    ul.appendChild(li);
  });
}

function filterTodo(): void {
  const todoListHtml: HTMLUListElement = document.getElementById(
    "todoList"
  ) as HTMLUListElement;

  if (todoListHtml === null) {
    console.log("nothing to filter");
    return;
  }
  const todoListFilter: HTMLInputElement = document.getElementById(
    "todoFilter"
  ) as HTMLInputElement;
  const todoListFilterText = todoListFilter.value.toUpperCase();

  todoListHtml.childNodes.forEach((item) => {
    let itemText: string | null = item.textContent;

    if (itemText !== null) {
      itemText = itemText.toUpperCase();

      if (itemText.startsWith(todoListFilterText)) {
        (item as HTMLLIElement).style.display = "block";
      } else {
        (item as HTMLLIElement).style.display = "none";
      }
    }
  });
}

function removeTodoListItem(itemToRemove: string): void {
  todoList = todoList.filter((todo) => todo !== itemToRemove);
  updateList();
  filterTodo();
}

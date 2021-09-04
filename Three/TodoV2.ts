console.log("!!! starting ... all task");
//model
class CreateTodoItem {
  private readonly _creationTime: number;
  private readonly _identifier: string;

  constructor(private _description: string, identifier?: string) {
    this._creationTime = new Date().getTime();

    if (identifier) {
      this._identifier = identifier;
    } else {
      this._identifier = Math.random().toString().substr(2, 9);
    }
  }

  get creationTime(): number {
    return this._creationTime;
  }

  get identifier(): string {
    return this._identifier;
  }
  get description(): string {
    return this._description;
  }
}

class TodoList {
  private _todoList: ReadonlyArray<CreateTodoItem> = [];

  constructor(todoItem?: CreateTodoItem[]) {
    if (Array.isArray(todoItem) && todoItem.length) {
      this._todoList = this._todoList.concat(todoItem);
    }
  }

  get todoList(): ReadonlyArray<CreateTodoItem> {
    return this._todoList;
  }

  addTodo(todoItemToAdd: CreateTodoItem): void {
    if (todoItemToAdd) {
      this._todoList = this._todoList.concat(todoItemToAdd);
    }
  }

  removeTodo(todoToRemove: string) {
    if (todoToRemove) {
      this._todoList = this._todoList.filter(
        (item) => item.identifier !== todoToRemove
      );
    }
  }
}

//view
interface TodoListView {
  render(todoList: ReadonlyArray<CreateTodoItem>): any;
  getInput(): CreateTodoItem;
  getFilter(): string;
  clearInput(): void;
  filter(): void;
}

class HTMLTodoListView implements TodoListView {
  private readonly _divContainer: HTMLDivElement;
  private readonly _todoInput: HTMLInputElement;
  private readonly _filterInput: HTMLInputElement;

  constructor() {
    this._divContainer = document.getElementById(
      "todoListContainer"
    ) as HTMLDivElement;
    this._filterInput = document.getElementById(
      "todoFilter"
    ) as HTMLInputElement;
    this._todoInput = document.getElementById("todoInput") as HTMLInputElement;

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

  render(todoList: readonly CreateTodoItem[]): void {
    this._divContainer.innerHTML = "";
    this._divContainer.textContent = "";

    const ul = document.createElement("ul");
    ul.setAttribute("id", "todoList");
    this._divContainer.appendChild(ul);

    todoList.forEach((todo) => {
      const li = document.createElement("li");
      li.setAttribute("class", "todo-list-item");
      li.innerHTML = `<a href="#" onclick='todoIt.removeTodo("${todo.identifier}")'>${todo.description}</a>`;
      ul.appendChild(li);
    });
  }

  getInput(): CreateTodoItem {
    const todoInputValue = this._todoInput.value.trim();
    return new CreateTodoItem(todoInputValue);
  }

  getFilter(): string {
    return this._filterInput.value.toUpperCase();
  }

  clearInput(): void {
    this._todoInput.value = "";
  }

  filter(): void {
    const todoListFilterText = this._filterInput.value.toUpperCase();
    const todoListHTML: HTMLUListElement = document.getElementById(
      "todoList"
    ) as HTMLUListElement;

    todoListHTML.childNodes.forEach((item) => {
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
}

//controller
interface TodoContraller {
  addTodo(): void;
  filterTodo(): void;
  removeTodo(identifier: string): void;
}

class todoController implements TodoContraller {
  private readonly _todoList = new TodoList();

  constructor(private _todoListView: TodoListView) {
    if (!_todoListView) {
      throw new Error("Todo list can't be empty");
    }
  }

  addTodo(): void {
    const newTodo = this._todoListView.getInput();
    if ("" !== newTodo.description) {
      this._todoList.addTodo(newTodo);

      this._todoListView.clearInput();
      this._todoListView.render(this._todoList.todoList);
      this._todoListView.filter();
    }
  }

  filterTodo(): void {
    this._todoListView.filter();
  }

  removeTodo(identifier: string): void {
    if (identifier) {
      this._todoList.removeTodo(identifier);
      this._todoListView.render(this._todoList.todoList);
    }
  }
}

//initializing

const view = new HTMLTodoListView();

const todoIt = new todoController(view);

class EventUtils {
  static isEnter(event: KeyboardEvent): boolean {
    let isEnterResult = false;

    if (event !== undefined && event.defaultPrevented) {
      return false;
    }

    if (event == undefined) {
      isEnterResult = false;
    } else if (event.key !== undefined) {
      isEnterResult = event.key === "Enter";
    } else if (event.keyCode !== undefined) {
      isEnterResult = event.keyCode === 13;
    }

    return isEnterResult;
  }
}

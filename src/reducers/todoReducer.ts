import { TodoType } from "../components/TodoList/types";

type TodoStateType = {
  todoList: TodoType[];
  totalId: number;
};

type TodoActionType = {
  type: string;
  id?: number;
  title?: string;
};

export const todoReducer = (
  todoState: TodoStateType,
  action: TodoActionType
) => {
  switch (action.type) {
    case "get_todo_list": {
      const storageTodoList = localStorage.getItem("todo");
      if (!storageTodoList) {
        return todoState;
      }

      const parseTodoList = JSON.parse(storageTodoList);

      if (parseTodoList.length < 1) {
        return todoState;
      }

      const localTodoListLen = parseTodoList.length;
      const lastIndex = parseTodoList[localTodoListLen - 1].id;

      return { todoList: parseTodoList, totalId: lastIndex };
    }

    case "add_todo": {
      const { title } = action;
      let storage = [];
      let storageTodoList = localStorage.getItem("todo");

      if (storageTodoList) {
        storage = JSON.parse(storageTodoList);
      }
      const newTodo = { id: todoState.totalId, title };
      storage.push(newTodo);

      if (storage) {
        localStorage.setItem("todo", JSON.stringify(storage));
      }
      return {
        totalId: todoState.totalId + 1,
        todoList: [...todoState.todoList, newTodo],
      };
    }

    case "delete_todo": {
      const { todoList } = todoState;
      const { id } = action;
      const newTodoList = todoList.filter((todo) => todo.id !== id);
      localStorage.setItem("todo", JSON.stringify(newTodoList));

      return { ...todoState, todoList: newTodoList };
    }
    default: {
      return todoState;
    }
  }
};

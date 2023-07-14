import { useQuery } from "@tanstack/react-query";
import { TodoType } from "../components/TodoList/types";

interface TodoQuery {
  parseTodoList: TodoType[];
  lastIndex: number;
}

const getTodos = () => {
  return new Promise<TodoQuery>((resolve) => {
    const storageTodoList = localStorage.getItem("todo");
    if (!storageTodoList) {
      return;
    }

    const parseTodoList = JSON.parse(storageTodoList);

    if (parseTodoList.length < 1) {
      return;
    }

    const localTodoListLen = parseTodoList.length;
    const lastIndex = parseTodoList[localTodoListLen - 1].id;
    resolve({ parseTodoList, lastIndex });
  });
};

export const TODOS_KEY = "todos";

const useTodosQuery = () =>
  useQuery({
    queryKey: [TODOS_KEY],
    queryFn: getTodos,
    // cacheTime: 5 * 60 * 1000, // 5분
    // staleTime: 1 * 60 * 1000, // 1분
    // retry: 1,
  });

export default useTodosQuery;

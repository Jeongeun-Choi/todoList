import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoType } from "../components/TodoList/types";
import { TODOS_KEY } from "./useTodosQuery";

interface TodoQuery {
  parseTodoList: TodoType[];
  lastIndex: number;
}

const handleRegistTodo = (value: string) =>
  new Promise((resolve) => {
    let storage = [];

    if (!value) {
      return;
    }
    let storageTodoList = localStorage.getItem("todo");
    let id = 0;

    if (storageTodoList) {
      storage = JSON.parse(storageTodoList);
      id = storage[storage.length - 1]?.id || 0;
    }

    const newTodo = {
      id: id + 1,
      title: value,
    };

    storage.push(newTodo);

    if (storage) {
      localStorage.setItem("todo", JSON.stringify(storage));
    }
    resolve(newTodo);
  });

const useTodosMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: string) => handleRegistTodo(value),
    onError: () => {
      console.log("에러");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TODOS_KEY],
      });
    },
  });
};
export default useTodosMutation;

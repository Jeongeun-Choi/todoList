import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { TodoInput } from "../components/TodoInput";
import { TodoList } from "../components/TodoList";
import { TodoType } from "../components/TodoList/types";

const Main = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [totalId, setTotalId] = useState<number>(1);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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

    setTotalId(lastIndex);
    setTodoList(parseTodoList);
  }, []);

  const handleRegistTodo = useCallback(() => {
    const value = inputRef.current?.value;
    let storage = [];

    if (!value) {
      return;
    }
    const newTodo = { id: totalId, title: value };
    let storageTodoList = localStorage.getItem("todo");

    if (storageTodoList) {
      storage = JSON.parse(storageTodoList);
    }

    storage.push(newTodo);

    if (storage) {
      localStorage.setItem("todo", JSON.stringify(storage));
    }
    setTodoList((prev) => [...prev, newTodo]);
    setTotalId((prev) => prev + 1);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [totalId]);

  const handleDeleteTodo = useCallback(
    (e: MouseEvent) => {
      const element = e.currentTarget.closest("li");
      const id = element?.dataset.id;

      if (id === undefined) {
        return;
      }

      const newTodoList = todoList.filter(
        (todo) => todo.id !== parseInt(id, 10)
      );

      setTodoList(newTodoList);

      localStorage.setItem("todo", JSON.stringify(newTodoList));
    },
    [todoList]
  );

  return (
    <div>
      <TodoInput ref={inputRef} onRegistTodo={handleRegistTodo} />
      <TodoList todoList={todoList} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
};

export default Main;

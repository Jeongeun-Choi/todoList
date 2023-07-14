import { MouseEvent, useCallback, useRef, useState } from "react";
import { TodoInput } from "../components/TodoInput";
import { TodoList } from "../components/TodoList";
import { TodoType } from "../components/TodoList/types";
import useTodosQuery from "../queries/useTodosQuery";
import useTodosMutation from "../queries/useTodosMutation";

const ZustandMain = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutation = useTodosMutation();
  const { data } = useTodosQuery();

  const handleRegistTodo = () => {
    const value = inputRef.current?.value;

    if (!value) {
      alert("빈 값입니다!");
      return;
    }

    mutation.mutate(value);

    if (inputRef.current.value) {
      inputRef.current.value = "";
    }
  };

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
      <TodoList
        todoList={data?.parseTodoList || []}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
};

export default ZustandMain;

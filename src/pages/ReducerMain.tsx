import { MouseEvent, useCallback, useEffect, useRef, useReducer } from "react";
import { TodoInput } from "../components/TodoInput";
import { TodoList } from "../components/TodoList";
import { todoReducer } from "../reducers";

const initState = {
  todoList: [],
  totalId: 1,
};

const ReducerMain = () => {
  const [todoState, dispatch] = useReducer(todoReducer, initState);
  const { todoList } = todoState;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch({
      type: "get_todo_list",
    });
  }, []);

  const handleRegistTodo = useCallback(() => {
    const value = inputRef.current?.value;

    if (!value) {
      return;
    }

    dispatch({ type: "add_todo", title: value });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  const handleDeleteTodo = useCallback((e: MouseEvent) => {
    const element = e.currentTarget.closest("li");
    const id = element?.dataset.id;

    if (id === undefined) {
      return;
    }
    dispatch({ type: "delete_todo", id: parseInt(id, 10) });
  }, []);

  return (
    <div>
      <TodoInput ref={inputRef} onRegistTodo={handleRegistTodo} />
      <TodoList todoList={todoList} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
};

export default ReducerMain;

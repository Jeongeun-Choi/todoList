import React from "react";
import TodoItem from "./TodoItem";
import { TodoListProps } from "./types";

function TodoList({ todoList, onDeleteTodo }: TodoListProps) {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;

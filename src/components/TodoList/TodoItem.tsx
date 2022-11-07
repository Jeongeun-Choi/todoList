import React from "react";
import { TodoItemProps } from "./types";

function TodoItem({ id, title, onDeleteTodo }: TodoItemProps) {
  return (
    <li key={id} data-id={id}>
      <span>{title}</span>
      <button id="delete-button" onClick={onDeleteTodo}>
        ❌
      </button>
    </li>
  );
}

export default TodoItem;

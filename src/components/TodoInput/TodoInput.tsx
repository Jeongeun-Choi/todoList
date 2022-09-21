import React, { forwardRef } from "react";
import { TodoInputProps } from "./types";

const TodoInput = forwardRef<HTMLInputElement, TodoInputProps>(
  ({ onRegistTodo }, ref) => {
    return (
      <div style={{ display: "flex" }}>
        <input ref={ref} />
        <button onClick={onRegistTodo}>제출</button>
      </div>
    );
  }
);

export default TodoInput;

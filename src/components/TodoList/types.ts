import { MouseEvent } from "react";

export type TodoType = {
  id: number;
  title: string;
};

export interface TodoListProps {
  todoList: TodoType[];
  onDeleteTodo: (e: MouseEvent) => void;
}

export interface TodoItemProps {
  id: number;
  title: string;
  onDeleteTodo: (e: MouseEvent) => void;
}

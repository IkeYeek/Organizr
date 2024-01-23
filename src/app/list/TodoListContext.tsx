import { createContext } from "react";
import { createTodoList, TodoList } from "@/business/TodoList";
import { AvailableIcons } from "@/business/AvailableIcons";
import { createTask, Task } from "@/business/Task";

type TodoListContextType = {
  lists: TodoList[];

  insertList: (t: TodoList) => TodoList | undefined;
  updateList: (list: TodoList) => void;
  deleteList: (list: TodoList) => void;

  insertTaskInList: (list: TodoList, item: Task) => void;
  updateTaskInList: (list: TodoList, task: Task) => void;
  deleteTaskInList: (list: TodoList, task: Task) => void;
  switchTaskStateInList: (list: TodoList, task: Task) => void;
};
const TodoListContext = createContext<TodoListContextType>({
  lists: [] as TodoList[],
  insertList: () => {
    throw new Error("default provider implementation doesn't work !");
  },
  updateList: (list: TodoList) => {
    throw new Error("default provider implementation doesn't work !");
  },
  deleteList: (list: TodoList) => {
    throw new Error("default provider implementation doesn't work !");
  },
  insertTaskInList: (list: TodoList, item: Task) => {
    throw new Error("default provider implementation doesn't work !");
  },
  updateTaskInList: (list: TodoList, task: Task) => {
    throw new Error("default provider implementation doesn't work !");
  },
  deleteTaskInList: (list: TodoList, task: Task) => {
    throw new Error("default provider implementation doesn't work !");
  },
  switchTaskStateInList: (list: TodoList, task: Task) => {
    throw new Error("default provider implementation doesn't work !");
  },
});

export default TodoListContext;

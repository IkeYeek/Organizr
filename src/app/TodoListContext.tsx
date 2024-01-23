import { createContext } from "react";
import { createTodoList, TodoList } from "@/business/TodoList";
import { AvailableIcons } from "@/business/AvailableIcons";
import { createTask, Task } from "@/business/Task";

type TodoListContextType = {
  lists: TodoList[];
  insert: (t: TodoList) => TodoList | undefined;
  updateList: (list: TodoList) => void;
  deleteList: (list: TodoList) => void;
  insertTaskInList: (list: TodoList, item: Task) => void;
  updateTask: (list: TodoList, task: Task) => void;
};
const TodoListContext = createContext<TodoListContextType>({
  lists: [] as TodoList[],
  insert: () => undefined,
  updateList: (list: TodoList) => {
    throw new Error("default provider implementation doesn't work !");
  },
  deleteList: (list: TodoList) => {
    throw new Error("default provider implementation doesn't work !");
  },
  insertTaskInList: (list: TodoList, item: Task) => {
    throw new Error("default provider implementation doesn't work !");
  },
  updateTask: (list: TodoList, task: Task) => {
    throw new Error("default provider implementation doesn't work !");
  },
});

export default TodoListContext;

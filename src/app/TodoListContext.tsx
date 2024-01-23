import { createContext } from "react";
import { createTodoList, TodoList } from "@/business/TodoList";
import { AvailableIcons } from "@/business/AvailableIcons";
import { createTask } from "@/business/Task";

type TodoListContextType = {
  lists: TodoList[];
  insert: (t: TodoList) => void;
};
const TodoListContext = createContext<TodoListContextType>({
  lists: [] as TodoList[],
  insert: () => {},
});

export default TodoListContext;

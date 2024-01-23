import { AvailableIcons } from "@/business/AvailableIcons";
import { Task } from "@/business/Task";

export type TodoListType = "Todo" | "TodoDone";

export type TodoList = {
  id: number;
  title: string;
  icon: AvailableIcons;
  type: TodoListType;
  tasks: Task[];
};

const createTodoList = (
  id?: number,
  title?: string,
  icon?: AvailableIcons,
  tasks?: Array<Task>,
  type?: TodoListType,
): TodoList => {
  return {
    id: id || (id === undefined ? -1 : 0),
    title: title || "new list",
    icon: icon || AvailableIcons.None,
    tasks: tasks || [],
    type: type || "Todo",
  };
};

export { createTodoList };

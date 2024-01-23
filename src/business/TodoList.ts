import { AvailableIcons } from "@/business/AvailableIcons";
import { Task } from "@/business/Task";

export type TodoListType = "Todo" | "Todo_Done";

type TodoListStruct = {
  id: number;
  title: string;
  icon: AvailableIcons;
  type: TodoListType;
  tasks: Task[];
};

export type TodoList = TodoListStruct & {
  todo: () => Task[];
  done: () => Task[];
  insertItem: (t: Task) => void;
};

const createTodoList = (
  id?: number,
  title?: string,
  icon?: AvailableIcons,
  tasks?: Array<Task>,
  type?: TodoListType,
): TodoList => {
  const todo_list: TodoListStruct = {
    id: id || (id === undefined ? -1 : 0),
    title: title || "new list",
    icon: icon || AvailableIcons.None,
    tasks: tasks || [],
    type: type || "Todo",
  };
  return {
    ...todo_list,
    todo: () => todo_list.tasks!.filter((task) => task.done),
    done: () => todo_list.tasks!.filter((task) => task.done),
    insertItem: (t: Task) => {
      todo_list.tasks!.push(t);
    },
  };
};

export { createTodoList };

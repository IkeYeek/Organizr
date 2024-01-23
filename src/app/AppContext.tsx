"use client";
import { createContext, ReactNode, useCallback, useContext } from "react";
import { createTodoList, TodoList, TodoListType } from "@/business/TodoList";
import { invoke } from "@tauri-apps/api/tauri";
import { Task } from "@/business/Task";
import {
  AvailableIconsAsStrings,
  iconEnumFromName,
} from "@/business/AvailableIcons";

type AppContextType = {
  pull_todo_lists: () => Promise<TodoList[]>;
  create_todo_list: () => Promise<TodoList>;
  pull_todo_list: (id: number) => Promise<TodoList>;
  delete_list: (id: number) => Promise<void>;
  update_list: (list: TodoList) => Promise<void>;

  create_task_in_list: (list_id: number) => Promise<void>;
  update_task_in_list: (list_id: number, task: Task) => Promise<void>;
  delete_task_in_list: (list_id: number, task_id: number) => Promise<void>;
};
const AppContext = createContext<AppContextType | undefined>(undefined);
const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const pull_todo_lists = useCallback(async () => {
    return await invoke<TodoList[]>("pull_todo_lists");
  }, []);

  const create_todo_list = useCallback(async () => {
    return await invoke<TodoList>("create_todo_list");
  }, []);

  const pull_todo_list = useCallback(async (id: number) => {
    const rawList = await invoke<{
      id: number;
      tasks: [Task];
      title: string;
      icon: string;
      list_type: string;
    } | null>("pull_todo_list", { id });
    if (rawList === null) throw new Error(`No list matching id ${id} returned`);
    return createTodoList(
      rawList.id,
      rawList.title,
      iconEnumFromName(rawList.icon as AvailableIconsAsStrings),
      rawList.tasks.map((t) => {
        return {
          ...t,
          due: t.due ? t.due * 1000 : t.due,
        };
      }),
      rawList.list_type as TodoListType,
    );
  }, []);

  const delete_list = useCallback(async (id: number) => {
    await invoke("delete_list", {
      id: id,
    });
  }, []);

  const update_list = useCallback(async (list: TodoList) => {
    await invoke("update_list", {
      updatedList: {
        ...list,
        list_type: list.type,
      },
    });
  }, []);

  const create_task_in_list = useCallback(async (list_id: number) => {
    await invoke("create_task_in_list", {
      id: list_id,
    });
  }, []);

  const update_task_in_list = useCallback(
    async (list_id: number, task: Task) => {
      await invoke("update_task_in_list", {
        id: list_id,
        task: {
          ...task,
        },
      });
    },
    [],
  );

  const delete_task_in_list = useCallback(
    async (list_id: number, task_id: number) => {
      await invoke("delete_task_in_list", {
        id: list_id,
        tid: task_id,
      });
    },
    [],
  );
  return (
    <AppContext.Provider
      value={{
        pull_todo_lists,
        create_todo_list,
        pull_todo_list,
        delete_list,
        update_list,
        create_task_in_list,
        update_task_in_list,
        delete_task_in_list,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppContextProvider;
export { AppContext, useAppContext };
export type { AppContextType };

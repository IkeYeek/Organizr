"use client";
import React, { ReactNode, useCallback, useState } from "react";
import { createTodoList, TodoList } from "@/business/TodoList";
import TodoListContext from "@/app/TodoListContext";
import { usePathname, useRouter } from "next/navigation";
import { AvailableIcons } from "@/business/AvailableIcons";
import { createTask } from "@/business/Task";
import { ArrowLeft } from "react-feather";
const DUMMY_LISTS: Array<TodoList> = [
  createTodoList(1, "Dummy 1", AvailableIcons.None),
  createTodoList(2, "Dummy 2", AvailableIcons.Camera),
  createTodoList(3, "Dummy 3", AvailableIcons.Camera),
  createTodoList(4, "Dummy 4", AvailableIcons.None),
  createTodoList(5, "Dummy 5", AvailableIcons.Camera),
  createTodoList(6, "Dummy 6", AvailableIcons.Camera),
  createTodoList(7, "Dummy 7", AvailableIcons.None, [
    createTask(),
    createTask(),
    createTask(undefined, undefined, true),
  ]),
];
const TodoListContextProvider = ({ content }: { content: ReactNode }) => {
  const [lists, setLists] = useState([...DUMMY_LISTS] as TodoList[]);
  const pathname = usePathname();
  const router = useRouter();
  const back = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <TodoListContext.Provider
      value={{
        lists: lists,
        insert: (value: TodoList) => setLists([...lists, value]),
      }}
    >
      {pathname !== "/" && (
        <button onClick={() => back()}>
          <ArrowLeft />
        </button>
      )}
      {content}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;

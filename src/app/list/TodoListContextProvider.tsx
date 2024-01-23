"use client";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { createTodoList, TodoList } from "@/business/TodoList";
import TodoListContext from "@/app/list/TodoListContext";
import { usePathname, useRouter } from "next/navigation";
import { AvailableIcons } from "@/business/AvailableIcons";
import { createTask, Task } from "@/business/Task";
import { ArrowLeft } from "react-feather";
const DUMMY_LISTS: Array<TodoList> = [
  createTodoList(0, "Dummy 1", AvailableIcons.None),
  createTodoList(1, "Dummy 2", AvailableIcons.Camera),
  createTodoList(2, "Dummy 3", AvailableIcons.Camera),
  createTodoList(3, "Dummy 4", AvailableIcons.None),
  createTodoList(4, "Dummy 5", AvailableIcons.Camera),
  createTodoList(5, "Dummy 6", AvailableIcons.Camera),
  createTodoList(6, "Dummy 7", AvailableIcons.None),
];
const TodoListContextProvider = ({ content }: { content: ReactNode }) => {
  const [lists, _setLists] = useState([
    /*...DUMMY_LISTS*/
  ] as TodoList[]);
  const pathname = usePathname();
  const router = useRouter();
  const back = useCallback(() => {
    router.back();
  }, [router]);
  const setLists = (l: TodoList[]) => {
    _setLists(l);
  };
  return (
    <TodoListContext.Provider
      value={{
        lists: lists,
        insertList: (value: TodoList) => {
          const newLists = [...lists, { ...value, id: lists.length }];
          setLists(newLists);
          return newLists[newLists.length - 1];
        },
        updateList: (list: TodoList) =>
          setLists(
            lists.map((currList) => {
              return list.id === currList.id ? list : currList;
            }),
          ),
        deleteList: (list: TodoList) =>
          setLists(lists.filter((currList) => list.id !== currList.id)),
        insertTaskInList: (list: TodoList, item: Task) =>
          setLists(
            lists.map((currList) =>
              currList.id !== list.id
                ? currList
                : {
                    ...currList,
                    tasks: [...currList.tasks, item],
                  },
            ),
          ),
        updateTaskInList: (list: TodoList, task: Task) => {
          list = {
            ...list,
            tasks: list.tasks.map((currTask) =>
              currTask.id === task.id ? task : currTask,
            ),
          };
          setLists(
            lists.map((currList) =>
              currList.id === list.id ? list : currList,
            ),
          );
        },
        deleteTaskInList: (list: TodoList, task: Task) =>
          setLists(
            lists.map((currList) =>
              currList.id !== list.id
                ? currList
                : {
                    ...list,
                    tasks: list.tasks.filter(
                      (currTask) => currTask.id !== task.id,
                    ),
                  },
            ),
          ),
        switchTaskStateInList: (list: TodoList, task: Task) =>
          setLists(
            lists.map((currList) =>
              currList.id !== list.id
                ? currList
                : {
                    ...list,
                    tasks: list.tasks.map((currTask) =>
                      currTask.id !== task.id
                        ? currTask
                        : {
                            ...task,
                            done: !task.done,
                          },
                    ),
                  },
            ),
          ),
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

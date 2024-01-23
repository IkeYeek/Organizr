"use client";
import { createTodoList, TodoList } from "@/business/TodoList";
import ListLink from "@/app/list/ListLink";
import {
  AvailableIcons,
  matchIconWithElement,
} from "@/business/AvailableIcons";
import { createTask } from "@/business/Task";
import CreateList from "@/app/list/CreateList";
import { useCallback, useContext, useEffect, useState } from "react";
import TodoListContext from "@/app/list/TodoListContext";
import Link from "next/link";
import styles from "./page.module.scss";
import createList from "@/app/list/CreateList";
import { useRouter } from "next/navigation";
import { invoke } from "@tauri-apps/api/tauri";
import moment from "moment";
import { emit, listen } from "@tauri-apps/api/event";

export default function Home() {
  const todoListContext = useContext(TodoListContext);
  const router = useRouter();
  const [todo_lists, setTodoLists] = useState<undefined | TodoList[]>(
    undefined,
  );

  const handleCreateList = useCallback(() => {
    invoke<TodoList>("create_todo_list")
      .then((l) => {
        router.push(`/list/${l.id}?new`);
      })
      .catch((e) => console.error(e));
  }, [router]);

  useEffect(() => {
    invoke("pull_todo_lists").then((lists) => {
      setTodoLists(lists);
    });
  }, []);

  if (todo_lists === undefined) return <p>loading...</p>;

  interface TestPayload {
    date: string;
  }
  interface TestEvent {
    payload: TestPayload;
  }

  return (
    <div className={styles.main}>
      {todo_lists.map((todo_list) => {
        return <ListLink todo_list={todo_list} key={todo_list.id} />;
      })}
      <CreateList handleCreateList={handleCreateList} />
    </div>
  );
}

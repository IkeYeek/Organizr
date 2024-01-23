"use client";
import { createTodoList, TodoList } from "@/business/TodoList";
import ListLink from "@/app/ListLink";
import {
  AvailableIcons,
  matchIconWithElement,
} from "@/business/AvailableIcons";
import { createTask } from "@/business/Task";
import CreateList from "@/app/CreateList";
import { useContext, useState } from "react";
import TodoListContext from "@/app/TodoListContext";
import Link from "next/link";
import styles from "./page.module.scss";
import createList from "@/app/CreateList";
import { useRouter } from "next/navigation";

export default function Home() {
  const todoListContext = useContext(TodoListContext);
  const router = useRouter();

  const handleCreateList = () => {
    const created = todoListContext.insertList(createTodoList());
    if (created !== undefined) {
      router.push(`/list/${created.id}?new`);
    } else {
      throw new Error("todo");
    }
  };

  return (
    <div className={styles.main}>
      {todoListContext.lists.map((todo_list) => {
        return <ListLink todo_list={todo_list} key={todo_list.id} />;
      })}
      <CreateList handleCreateList={handleCreateList} />
    </div>
  );
}

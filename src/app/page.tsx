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

export default function Home() {
  const todoListContext = useContext(TodoListContext);
  const lists = todoListContext.lists;

  const handleCreateList = () => {
    todoListContext.insert(createTodoList());
  };

  return (
    <div className={styles.main}>
      {lists.map((todo_list) => {
        return <ListLink todo_list={todo_list} key={todo_list.id} />;
      })}
      <CreateList handleCreateList={handleCreateList} />
    </div>
  );
}

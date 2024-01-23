import React, { useCallback } from "react";
import { matchIconWithElement } from "@/business/AvailableIcons";
import "./styles/listlink.scss";
import { TodoList } from "@/business/TodoList";
import { useRouter } from "next/navigation";
import styles from "./styles/listlink.module.scss";
import { route } from "@/business/Helpers";
import { Task } from "@/business/Task";

export type ListLinkProps = {
  todo_list: TodoList;
};
const ListLink = ({ todo_list }: ListLinkProps) => {
  const icon = matchIconWithElement(todo_list.icon);
  const router = useRouter();
  const doneTasks = todo_list.tasks.filter((task) => !task.done);
  const displayedNoGenerator = useCallback((tasks: Task[]) => {
    return tasks.length < 100 ? tasks.length.toString() : "99+";
  }, []);
  return (
    <div
      className={"card has-background-info list-link"}
      style={{
        width: "calc(17ch + 50px)",
      }}
      onClick={() => {
        route(`/list?id=${todo_list.id}`, router).catch((e) =>
          console.error(e),
        );
      }}
    >
      <div className={`card-content list-link-content ${styles["card-fix"]}`}>
        {icon !== null && <div className={styles["card-fix-marg"]}>{icon}</div>}
        <h3 className={styles.listTitle}>{todo_list.title}</h3>
      </div>
      <footer className="card-footer">
        <span className="card-footer-item">
          <p>{displayedNoGenerator(todo_list.tasks)} tasks</p>
        </span>
        <span className="card-footer-item">
          <p>{displayedNoGenerator(doneTasks)} todo</p>
        </span>
      </footer>
    </div>
  );
};

export default ListLink;

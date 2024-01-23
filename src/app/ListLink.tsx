import React from "react";
import { matchIconWithElement } from "@/business/AvailableIcons";
import "./listlink.scss";
import { TodoList } from "@/business/TodoList";
import { useRouter } from "next/navigation";

export type ListLinkProps = {
  todo_list: TodoList;
};
const ListLink = ({ todo_list }: ListLinkProps) => {
  const icon = matchIconWithElement(todo_list.icon);
  const router = useRouter();
  return (
    <div
      className={"card has-background-info list-link"}
      onClick={() => {
        router.push(`/list/${todo_list.id}`);
      }}
    >
      <div
        className="card-content list-link-content"
        style={{
          minHeight: "70%", // TODO clear this shit
        }}
      >
        {icon !== null && (
          <div
            className={""}
            style={{
              marginBottom: 10,
            }}
          >
            {icon}
          </div>
        )}
        <h3>{todo_list.title}</h3>
      </div>
      <footer className="card-footer">
        <span className="card-footer-item">
          <p>{todo_list.tasks.length} tasks</p>
        </span>
        <span className="card-footer-item">
          <p>{todo_list.todo().length} to do</p>
        </span>
      </footer>
    </div>
  );
};

export default ListLink;

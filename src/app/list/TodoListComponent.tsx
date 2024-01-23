import styles from "@/app/list/styles/todolist.module.scss";
import { Settings } from "react-feather";
import SimpleTodoList from "@/app/list/SimpleTodoList";
import { invoke } from "@tauri-apps/api/tauri";
import TodoDoneList from "@/app/list/TodoDoneList";
import type { TodoList } from "@/business/TodoList";

const TodoListComponent = ({
  list,
  setModalActive,
}: {
  list: TodoList;
  setModalActive: () => void;
}) => {
  return (
    <div className={"card has-background-info"}>
      <header className="card-header">
        <div
          className="card-header-title"
          style={{
            maxWidth: "100%",
          }}
        >
          <p className={styles.listTitle}>{list.title}</p>
          <button
            className={`button is-rounded is-dark ${styles["settings-icon"]}`}
            onClick={setModalActive}
          >
            <Settings />
          </button>
        </div>
      </header>
      <div className="card-content">
        {list.type === "Todo" ? (
          <SimpleTodoList
            list={list}
            updateTask={(task) => {
              invoke("update_task_in_list", {
                id: list!.id,
                task: {
                  ...task,
                },
              }).catch((e) => console.error(e));
            }}
          />
        ) : (
          <TodoDoneList
            list={list}
            updateTask={(task) => {
              invoke("update_task_in_list", {
                id: list!.id,
                task,
              }).catch((e) => console.error(e));
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TodoListComponent;

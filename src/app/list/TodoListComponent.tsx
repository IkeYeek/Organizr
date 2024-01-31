import styles from "@/app/list/styles/todolist.module.scss";
import { Settings } from "react-feather";
import TodoDoneList from "@/app/list/TodoDoneList";
import type { TodoList } from "@/business/TodoList";
import { useAppContext } from "@/app/AppContext";
import SimpleTodoList from "@/app/list/SimpleTodoList";
import SimpleTodoListV2 from "@/app/list/SimpleTodoListV2";

const TodoListComponent = ({
  list,
  setModalActive,
}: {
  list: TodoList;
  setModalActive: () => void;
}) => {
  const context = useAppContext();

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
          <SimpleTodoListV2
            list={list}
            updateTask={(task) =>
              context
                .update_task_in_list(list.id, task)
                .catch((e) => console.error(e))
            }
          />
        ) : (
          <TodoDoneList
            list={list}
            updateTask={(task) =>
              context
                .update_task_in_list(list.id, task)
                .catch((e) => console.error(e))
            }
          />
        )}
      </div>
    </div>
  );
};

export default TodoListComponent;

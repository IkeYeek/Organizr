import { Task } from "@/business/Task";
import { useState } from "react";
import { Bell, Check, Trash, X } from "react-feather";
import { inspect } from "util";
import styles from "./taskcomponent.module.scss";

const TaskComponent = ({
  task,
  updateTask,
  deleteTask,
  switchTaskStatus,
}: {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: () => void;
  switchTaskStatus: () => void;
}) => {
  const [title, setTitle] = useState(task.title);

  return (
    <div className={styles["task-component"]}>
      <div className="field has-addons has-background-grey-darker columns">
        <p className="control column is-0 ">
          <button
            className={`has-background-grey-darker ${styles["task-component-button"]}`}
          >
            <Trash
              className={styles["task-component-icon"]}
              onClick={deleteTask}
            />
          </button>
        </p>
        <p className={`control column is-11 ${styles["input-container"]}`}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`has-background-grey-dark ${styles.input}`}
            onBlur={() =>
              updateTask({
                ...task,
                title: title,
              })
            }
          />
        </p>
        <p className="control column is-0">
          <button
            className={`has-background-grey-darker ${styles["task-component-button"]}`}
          >
            <Bell className={styles["task-component-icon"]} />
          </button>
        </p>
        <p className="control column is-0 ml-5">
          <button
            className={`has-background-grey-darker ${styles["task-component-button"]}`}
          >
            {!task.done ? (
              <Check
                className={styles["task-component-icon"]}
                onClick={switchTaskStatus}
              />
            ) : (
              <X
                className={styles["task-component-icon"]}
                onClick={switchTaskStatus}
              />
            )}
          </button>
        </p>
      </div>
    </div>
  );
};

export default TaskComponent;

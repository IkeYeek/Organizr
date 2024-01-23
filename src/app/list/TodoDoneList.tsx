import { NotificationType, Task } from "@/business/Task";
import { Plus } from "react-feather";
import { TodoList } from "@/business/TodoList";
import VerticalTaskComponent from "@/app/list/VerticalTaskComponent";
import { invoke } from "@tauri-apps/api/tauri";
import { useCallback } from "react";

const TodoDoneList = ({
  list,
  updateTask,
}: {
  list: TodoList;
  updateTask: (task: Task) => void;
}) => {
  const addTaskToList = useCallback(() => {
    invoke("create_task_in_list", {
      id: list.id,
    }).catch((e) => console.error(e));
  }, [list.id]);

  return (
    <div className={"columns"}>
      <div className={"column is-6"}>
        <ul>
          {list.tasks
            .filter((task) => !task.done)
            .map((task) => {
              return (
                <VerticalTaskComponent
                  task={task}
                  key={task.id}
                  updateTask={(t) => {
                    updateTask(t);
                  }}
                  deleteTask={() =>
                    invoke("delete_task_in_list", {
                      id: list.id,
                      tid: task.id,
                    }).catch((e) => console.error(e))
                  }
                  setNotificationMode={(mode: NotificationType) => {
                    invoke("update_task_in_list", {
                      id: list!.id,
                      task: {
                        ...task,
                        notify: mode,
                      },
                    }).catch((e) => console.error(e));
                  }}
                  switchTaskStatus={() => {
                    invoke("update_task_in_list", {
                      id: list!.id,
                      task: {
                        ...task,
                        done: !task.done,
                      },
                    }).catch((e) => console.error(e));
                  }}
                />
              );
            })}
        </ul>
        <a onClick={addTaskToList}>
          <Plus />
        </a>
      </div>
      <div className={"column is-6"}>
        <ul>
          {list.tasks
            .filter((task) => task.done)
            .map((task) => {
              return (
                <VerticalTaskComponent
                  task={task}
                  key={task.id}
                  updateTask={(t) => {
                    updateTask(t);
                  }}
                  deleteTask={() =>
                    invoke("delete_task_in_list", {
                      id: list.id,
                      tid: task.id,
                    }).catch((e) => console.error(e))
                  }
                  setNotificationMode={(mode: NotificationType) => {
                    invoke("update_task_in_list", {
                      id: list!.id,
                      task: {
                        ...task,
                        notify: mode,
                      },
                    }).catch((e) => console.error(e));
                  }}
                  switchTaskStatus={() => {
                    invoke("update_task_in_list", {
                      id: list!.id,
                      task: {
                        ...task,
                        done: !task.done,
                      },
                    }).catch((e) => console.error(e));
                  }}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default TodoDoneList;

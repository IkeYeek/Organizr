import { NotificationType, Task } from "@/business/Task";
import { Plus } from "react-feather";
import { TodoList } from "@/business/TodoList";
import VerticalTaskComponent from "@/app/list/VerticalTaskComponent";
import { useCallback } from "react";
import { useAppContext } from "@/app/AppContext";

const TodoDoneList = ({
  list,
  updateTask,
}: {
  list: TodoList;
  updateTask: (task: Task) => void;
}) => {
  const context = useAppContext();
  const addTaskToList = useCallback(() => {
    context.create_task_in_list(list.id).catch((e) => console.error(e));
  }, [context, list.id]);

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
                    context
                      .delete_task_in_list(list.id, task.id)
                      .catch((e) => console.error(e))
                  }
                  setNotificationMode={(mode: NotificationType) =>
                    context
                      .update_task_in_list(list.id, {
                        ...task,
                        notify: mode,
                      })
                      .catch((e) => console.error(e))
                  }
                  switchTaskStatus={() =>
                    context
                      .update_task_in_list(list.id, {
                        ...task,
                        done: !task.done,
                      })
                      .catch((e) => console.error(e))
                  }
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
                    context
                      .delete_task_in_list(list.id, task.id)
                      .catch((e) => console.error(e))
                  }
                  setNotificationMode={(mode: NotificationType) => {
                    context
                      .update_task_in_list(list.id, {
                        ...task,
                        notify: mode,
                      })
                      .catch((e) => console.error(e));
                  }}
                  switchTaskStatus={() => {
                    context
                      .update_task_in_list(list.id, {
                        ...task,
                        done: !task.done,
                      })
                      .catch((e) => console.error(e));
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

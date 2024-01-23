import { TodoList } from "@/business/TodoList";
import { Plus } from "react-feather";
import { NotificationType, Task } from "@/business/Task";
import TaskComponent from "@/app/list/TaskComponent";
import { invoke } from "@tauri-apps/api/tauri";
import { useCallback } from "react";
import { useAppContext } from "@/app/AppContext";

const SimpleTodoList = ({
  list,
  updateTask,
}: {
  list: TodoList;
  updateTask: (task: Task) => void;
}) => {
  const context = useAppContext();
  const addTaskToList = useCallback(() => {
    context.create_task_in_list(list.id).catch((e) => console.error(e));
  }, [list.id]);

  return (
    <>
      <ul>
        {list.tasks.map((task) => {
          return (
            <TaskComponent
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
      <a onClick={addTaskToList}>
        <Plus />
      </a>
    </>
  );
};

export default SimpleTodoList;

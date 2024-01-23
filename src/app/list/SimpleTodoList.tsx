import { TodoList } from "@/business/TodoList";
import { Plus } from "react-feather";
import { NotificationType, Task } from "@/business/Task";
import TaskComponent from "@/app/list/TaskComponent";
import { invoke } from "@tauri-apps/api/tauri";

const SimpleTodoList = ({
  list,
  updateTask,
}: {
  list: TodoList;
  updateTask: (task: Task) => void;
}) => {
  const addTaskToList = () => {
    invoke("create_task_in_list", {
      id: list.id,
    }).catch((e) => console.error(e));
  };

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
    </>
  );
};

export default SimpleTodoList;

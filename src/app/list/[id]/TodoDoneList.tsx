import TaskComponent from "@/app/list/[id]/TaskComponent";
import { createTask, NotificationType, Task } from "@/business/Task";
import { Plus } from "react-feather";
import { useContext } from "react";
import TodoListContext from "@/app/list/TodoListContext";
import { TodoList } from "@/business/TodoList";
import VerticalTaskComponent from "@/app/list/[id]/VerticalTaskComponent";
import { invoke } from "@tauri-apps/api/tauri";

const TodoDoneList = ({
  list,
  updateTask,
}: {
  list: TodoList;
  updateTask: (task: Task) => void;
}) => {
  const context = useContext(TodoListContext);
  const addTaskToList = () => {
    invoke("create_task_in_list", {
      id: list.id,
    }).catch((e) => console.error(e));
  };

  const showTodoFirst = (tasks: Task[]): Task[] => {
    return tasks.sort((a, b) => {
      return (a.done && b.done) || (!a.done && !b.done)
        ? 0
        : a.done && !b.done
          ? 1
          : -1;
    });
  };

  const filter = (tasks: Task[]): Task[] => {
    let filters = (tasks: Task[]) => tasks;
    if (false) filters = (tasks: Task[]) => showTodoFirst(filters(tasks));
    return filters(tasks);
  };
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
                    console.log("...");
                    invoke("update_task_in_list", {
                      id: list!.id,
                      task: {
                        ...task,
                        notify: mode,
                      },
                    }).catch((e) => console.error(e));
                  }}
                  switchTaskStatus={
                    () => {
                      invoke("update_task_in_list", {
                        id: list!.id,
                        task: {
                          ...task,
                          done: !task.done,
                        },
                      }).catch((e) => console.error(e));
                    }
                    /*context.updateTaskInList(list, {
                          ...task,
                          done: !task.done,
                        })*/
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
                    invoke("delete_task_in_list", {
                      id: list.id,
                      tid: task.id,
                    }).catch((e) => console.error(e))
                  }
                  setNotificationMode={(mode: NotificationType) => {
                    console.log("...");
                    invoke("update_task_in_list", {
                      id: list!.id,
                      task: {
                        ...task,
                        notify: mode,
                      },
                    }).catch((e) => console.error(e));
                  }}
                  switchTaskStatus={
                    () => {
                      invoke("update_task_in_list", {
                        id: list!.id,
                        task: {
                          ...task,
                          done: !task.done,
                        },
                      }).catch((e) => console.error(e));
                    }
                    /*context.updateTaskInList(list, {
                      ...task,
                      done: !task.done,
                    })*/
                  }
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default TodoDoneList;

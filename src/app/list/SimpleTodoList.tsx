import { TodoList } from "@/business/TodoList";
import { Plus } from "react-feather";
import { createTask, NotificationType, Task } from "@/business/Task";
import { useContext, useEffect, useState } from "react";
import TodoListContext from "@/app/list/TodoListContext";
import TaskComponent from "@/app/list/TaskComponent";
import { invoke } from "@tauri-apps/api/tauri";

const SimpleTodoList = ({
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
    <>
      <ul>
        {filter(list.tasks).map((task) => {
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
    </>
  );
};

export default SimpleTodoList;

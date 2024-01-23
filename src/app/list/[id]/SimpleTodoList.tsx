import { TodoList } from "@/business/TodoList";
import { Plus } from "react-feather";
import { createTask, NotificationType, Task } from "@/business/Task";
import { useContext, useEffect, useState } from "react";
import TodoListContext from "@/app/list/TodoListContext";
import TaskComponent from "@/app/list/[id]/TaskComponent";

const SimpleTodoList = ({
  list,
  updateTask,
}: {
  list: TodoList;
  updateTask: (task: Task) => void;
}) => {
  const context = useContext(TodoListContext);
  const addTaskToList = () => {
    context.insertTaskInList(list, createTask());
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
              deleteTask={() => context.deleteTaskInList(list, task)}
              setNotificationMode={(mode: NotificationType) =>
                context.updateTaskInList(list, {
                  ...task,
                  notify: mode,
                })
              }
              switchTaskStatus={() =>
                context.updateTaskInList(list, {
                  ...task,
                  done: !task.done,
                })
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

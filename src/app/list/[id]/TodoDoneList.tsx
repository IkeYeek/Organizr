import TaskComponent from "@/app/list/[id]/TaskComponent";
import { createTask, NotificationType, Task } from "@/business/Task";
import { Plus } from "react-feather";
import { useContext } from "react";
import TodoListContext from "@/app/list/TodoListContext";
import { TodoList } from "@/business/TodoList";
import VerticalTaskComponent from "@/app/list/[id]/VerticalTaskComponent";

const TodoDoneList = ({
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
      </div>
    </div>
  );
};

export default TodoDoneList;

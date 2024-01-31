import { TodoList } from "@/business/TodoList";
import { Plus } from "react-feather";
import { NotificationType, Task } from "@/business/Task";
import TaskComponent from "@/app/list/TaskComponent";
import { useCallback, useEffect, useRef } from "react";
import { useAppContext } from "@/app/AppContext";
import { useVirtualizer } from "@tanstack/react-virtual";

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
  }, [context, list.id]);

  const listHTMLRef = useRef<HTMLUListElement>(null);
  const virtualList = useVirtualizer({
    count: list.tasks.length,
    getScrollElement: useCallback(() => listHTMLRef.current, []),
    estimateSize: useCallback(() => 10, []),
  });

  return (
    <>
      <ul
        ref={listHTMLRef}
        style={{
          minWidth: 1,
          minHeight: 1,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        {virtualList.getVirtualItems().map((virtualTask) => {
          const task = list.tasks[virtualTask.index];
          return (
            <TaskComponent
              task={task}
              key={virtualTask.key}
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

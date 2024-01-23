import { TodoList } from "@/business/TodoList";
import { Plus } from "react-feather";
import { createTask, Task } from "@/business/Task";
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
              deleteTask={() => context.deleteTaskInList(list, task)}
              switchTaskStatus={() => context.switchTaskStateInList(list, task)}
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

import { Task } from "@/business/Task";
import { useState } from "react";

const TaskComponent = ({
  task,
  updateTask,
}: {
  task: Task;
  updateTask: (task: Task) => void;
}) => {
  const [title, setTitle] = useState(task.title);

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() =>
          updateTask({
            ...task,
            title: title,
          })
        }
      />
    </div>
  );
};

export default TaskComponent;

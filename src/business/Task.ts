import { v4 as uuidv4 } from "uuid";
export enum NotificationType {
  None,
  Non_Intrusive,
  Intrusive,
}

export type Task = {
  id: string;
  title: string;
  done: boolean;
  due?: Date;
  notify: NotificationType;
};

const createTask = (
  id?: string,
  title?: string,
  done?: boolean,
  due?: Date,
  notify?: NotificationType,
): Task => {
  const task: Task = {
    id: id || uuidv4(),
    title: title || "new task",
    done: done || false,
    notify: notify || NotificationType.None,
  };

  return task;
};

export { createTask };

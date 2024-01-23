import { v4 as uuidv4 } from "uuid";
export enum NotificationType {
  None = "None",
  Non_Intrusive = "Non_Intrusive",
  Intrusive = "Intrusive",
}

export type Task = {
  id: number;
  title: string;
  done: boolean;
  due?: Date;
  notify: NotificationType;
};

const createTask = (
  id?: number,
  title?: string,
  done?: boolean,
  due?: Date,
  notify?: NotificationType,
): Task => {
  const task: Task = {
    id: id || 0,
    title: title || "new task",
    done: done || false,
    notify: notify || NotificationType.None,
  };

  return task;
};

export { createTask };

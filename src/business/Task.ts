export enum NotificationType {
  None,
  Non_Intrusive,
  Intrusive,
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
    id: id || -1,
    title: title || "new task",
    done: done || false,
    notify: notify || NotificationType.None,
  };

  return task;
};

export { createTask };

export enum NotificationType {
  None = "None",
  NonIntrusive = "NonIntrusive",
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
  return {
    id: id || 0,
    title: title || "new task",
    done: done || false,
    notify: notify || NotificationType.None,
  };
};

export { createTask };

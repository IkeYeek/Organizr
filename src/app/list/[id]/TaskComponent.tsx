"use client";
import { NotificationType, Task } from "@/business/Task";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Bell, BellOff, Check, Trash, X } from "react-feather";
import styles from "./taskcomponent.module.scss";
import TaskInput from "@/app/list/[id]/TaskInput";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const TaskComponent = ({
  task,
  updateTask,
  deleteTask,
  switchTaskStatus,
  setNotificationMode: __setNotificationMode,
}: {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: () => void;
  switchTaskStatus: () => void;
  setNotificationMode: (mode: NotificationType) => void;
}) => {
  const [title, setTitle] = useState(task.title);
  const [notificationMenuActive, setNotificationMenuActive] = useState(false);
  const [notificationMode, _setNotificationMode] = useState(task.notify);
  const [textAreaElement, setTextAreaElement] =
    useState<HTMLTextAreaElement | null>(null);
  const [textAreaFocused, setTextAreaFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setTextAreaElement(textAreaRef.current);
  }, [textAreaRef]);

  const setNotificationMode = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    type: NotificationType,
  ) => {
    e.stopPropagation();
    _setNotificationMode(type);
    __setNotificationMode(type);
  };
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [notifyDate, setNotifyDate] = useState<Value>(new Date());

  const configureNotification = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {};

  return (
    <>
      <div
        className={styles["task-component"]}
        onClick={() => {
          if (notificationMenuActive) setNotificationMenuActive(false);
        }}
      >
        <div className="field has-addons has-background-grey-darker columns">
          <div className="control column is-0 ">
            <button
              className={`has-background-grey-darker ${styles["task-component-button"]}`}
            >
              <Trash
                className={`${styles["task-component-icon"]} has-text-danger`}
                onClick={deleteTask}
              />
            </button>
          </div>
          <div className={`control column is-10 ${styles["input-container"]}`}>
            <TaskInput
              value={title}
              onChange={(e) => setTitle(e)}
              onChange1={(e) => setTitle(e.target.value)}
              textAreaRef={textAreaRef}
              onFocus={() => setTextAreaFocused(true)}
              textAreaElement={textAreaElement}
              textAreaFocused={textAreaFocused}
              onBlur={() => {
                updateTask({
                  ...task,
                  title: title,
                });
                setTextAreaFocused(false);
              }}
            />
            23/12/2023 - 13:12
          </div>
          <div className="control column is-0">
            <div
              className={`dropdown ${styles["dropdown-fh"]} ${
                notificationMenuActive ? "is-active" : ""
              }`}
              onClick={() => setNotificationMenuActive(true)}
              onBlur={() => setNotificationMenuActive(false)}
              onContextMenu={(e) => configureNotification(e)}
            >
              <div className="dropdown-trigger">
                <button
                  className={`has-background-grey-darker ${styles["task-component-button"]}`}
                >
                  {notificationMode === NotificationType.None ? (
                    <BellOff
                      className={`${styles["task-component-icon"]} has-text-grey`}
                    />
                  ) : notificationMode === NotificationType.Non_Intrusive ? (
                    <Bell
                      className={`${styles["task-component-icon"]} has-text-grey`}
                    />
                  ) : (
                    <Bell
                      className={`${styles["task-component-icon"]} has-text-info`}
                    />
                  )}
                </button>
              </div>
              <div className="dropdown-menu">
                <div className="dropdown-content has-background-grey-darker">
                  <a
                    href="#"
                    className="dropdown-item has-text-primary"
                    onMouseDown={(e) =>
                      setNotificationMode(e, NotificationType.None)
                    }
                  >
                    <BellOff className={"mr-5 has-text-grey"} />
                    None
                  </a>
                  <a
                    href="#"
                    className="dropdown-item has-text-primary"
                    onMouseDown={(e) =>
                      setNotificationMode(e, NotificationType.Non_Intrusive)
                    }
                  >
                    <Bell className={"mr-5 has-text-grey"} />
                    Non Intrusive
                  </a>
                  <a
                    href="#"
                    className="dropdown-item has-text-primary"
                    onMouseDown={(e) =>
                      setNotificationMode(e, NotificationType.Intrusive)
                    }
                  >
                    <Bell className={"mr-5 has-text-info"} />
                    Intrusive
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="control column is-0 ml-5">
            <button
              className={`has-background-grey-darker ${styles["task-component-button"]}`}
            >
              {!task.done ? (
                <Check
                  className={`${styles["task-component-icon"]} has-text-primary`}
                  onMouseDown={switchTaskStatus}
                />
              ) : (
                <X
                  className={`${styles["task-component-icon"]} has-text-danger`}
                  onMouseDown={switchTaskStatus}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskComponent;

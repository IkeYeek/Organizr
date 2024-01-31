"use client";
import { NotificationType, Task } from "@/business/Task";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Bell, BellOff, Check, Trash, X } from "react-feather";
import styles from "./styles/taskcomponent.module.scss";
import TaskInput from "@/app/list/TaskInput";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import bulmaCalendar, { EventType } from "bulma-calendar";

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
  useEffect(() => {
    _setNotificationMode(task.notify);
  }, [task.notify]);
  useEffect(() => {
    setTitle(task.title);
  }, [task.title]);
  const [textAreaElement, setTextAreaElement] =
    useState<HTMLTextAreaElement | null>(null);
  const [textAreaFocused, setTextAreaFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setTextAreaElement(textAreaRef.current);
  }, [textAreaRef]);

  const [datetime, setDateTime] = useState(task.due);
  const [calendar, setCalendar] = useState<bulmaCalendar | undefined>(
    undefined,
  );
  const calendarRef = useRef<HTMLInputElement>(null);

  const setNotificationMode = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      type: NotificationType,
    ) => {
      e.stopPropagation();
      _setNotificationMode(type);
      __setNotificationMode(type);
    },
    [__setNotificationMode],
  );

  useEffect(() => {
    setDateTime(task.due);
  }, [task.due]);

  useEffect(() => {
    if (calendarRef.current !== null && calendar === undefined) {
      import("bulma-calendar").then((r) => {
        const bulmaCalendar = r.default;
        const _calendar = new bulmaCalendar(calendarRef.current!, {
          startDate: datetime ? new Date(datetime) : new Date(0),
          startTime: datetime ? new Date(datetime) : new Date(0),
        });
        _calendar.on("save" as unknown as EventType, (e) => {
          setDateTime(e.data.date.start?.getTime());
          updateTask({
            ...task,
            due: e.data.date.start?.getTime(),
          });
        });
        setCalendar(_calendar);
      });
    }
  }, [calendar, datetime, task, updateTask]);

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
            <input type="datetime-local" ref={calendarRef} />
          </div>
          <div className="control column is-0">
            <div
              className={`dropdown ${styles["dropdown-fh"]} ${
                notificationMenuActive ? "is-active" : ""
              }`}
              onClick={() => setNotificationMenuActive(true)}
              onBlur={() => setNotificationMenuActive(false)}
            >
              <div className="dropdown-trigger">
                <button
                  className={`has-background-grey-darker ${styles["task-component-button"]}`}
                >
                  {notificationMode === NotificationType.None ? (
                    <BellOff
                      className={`${styles["task-component-icon"]} has-text-grey`}
                    />
                  ) : notificationMode === NotificationType.NonIntrusive ? (
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
                      setNotificationMode(e, NotificationType.NonIntrusive)
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

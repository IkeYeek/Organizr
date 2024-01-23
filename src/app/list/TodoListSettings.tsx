"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { TodoListType } from "@/business/TodoList";
import {
  AvailableIcons,
  AvailableIconsAsStrings,
  iconEnumFromName,
  matchIconWithElement,
} from "@/business/AvailableIcons";
import styles from "./styles/settings.module.scss";
import NoIcon from "@/app/list/NoIcon";
import EnhancedTextInput from "@/app/EnhancedTextInput";

export type ListSettings = {
  title: string;
  type: TodoListType;
  icon: AvailableIcons;
};

type TodoListSettingsProps = {
  listSettings: ListSettings;
  updateListSettings: (nls: ListSettings) => void;
  deleteList: () => void;
  active: boolean;
};
const TodoListSettings = ({
  listSettings,
  updateListSettings,
  deleteList,
  active,
}: TodoListSettingsProps) => {
  const [title, setTitle] = useState(listSettings.title);
  const [type, setType] = useState(listSettings.type);
  const [icon, setIcon] = useState(listSettings.icon);
  const [iconDropdownActive, setIconDropdownActive] = useState(false);

  const initValues = useCallback(() => {
    setTitle(listSettings.title);
    setType(listSettings.type);
    setIcon(listSettings.icon);
  }, [listSettings]);

  useEffect(() => {
    initValues();
  }, [active, initValues]);

  useEffect(() => {
    updateListSettings({
      title,
      type,
      icon,
    });
  }, [title, type, icon, updateListSettings]);
  return (
    <>
      <div>
        <div className="field">
          <label htmlFor="name" className="label">
            name
          </label>
          <div className="control">
            <EnhancedTextInput value={title} onChange={(e) => setTitle(e)}>
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </EnhancedTextInput>
          </div>
        </div>
        <div className="buttons has-addons">
          <button
            className={`button ${
              type === "Todo"
                ? "is-active has-background-primary"
                : "is-disabled"
            } ${styles["list-type-button"]}`}
            onClick={() => setType("Todo")}
          >
            Todo
          </button>
          <button
            className={`button ${
              type === "TodoDone"
                ? "is-active has-background-primary"
                : "is-disabled"
            } ${styles["list-type-button"]}`}
            onClick={() => setType("TodoDone")}
          >
            Todo + Done
          </button>
        </div>
        <div className="field">
          <label htmlFor="icon" className="label">
            icon
          </label>
          <div className="control">
            <div
              className={`dropdown ${iconDropdownActive ? "is-active" : ""}`}
              onPointerDown={() => {
                setIconDropdownActive(true);
              }}
            >
              <div className="dropdown-trigger">
                {matchIconWithElement(icon) || <NoIcon />}
              </div>
              <div className="dropdown-menu" role="menu">
                <div
                  className={`dropdown-content ${styles["dropdown-content-style"]}`}
                >
                  {Object.keys(AvailableIcons)
                    .filter((v) => isNaN(Number(v)))
                    .map((e) => {
                      return (
                        <a
                          className={"dropdown-item"}
                          key={e}
                          onClick={() => {
                            setIcon(
                              iconEnumFromName(e as AvailableIconsAsStrings),
                            );
                            setIconDropdownActive(false);
                          }}
                        >
                          {matchIconWithElement(
                            iconEnumFromName(e as AvailableIconsAsStrings),
                          ) || <NoIcon />}
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <button
            className={`button is-danger ${styles["delete-button"]}`}
            onClick={deleteList}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoListSettings;

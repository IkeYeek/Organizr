import { useCallback, useEffect, useState } from "react";
import { TodoListType } from "@/business/TodoList";
import {
  AvailableIcons,
  iconEnumFromName,
  matchIconWithElement,
} from "@/business/AvailableIcons";

export type ListSettings = {
  title: string;
  type: TodoListType;
  icon: AvailableIcons;
};

type TodoListSettingsProps = {
  listSettings: ListSettings;
  updateListSettings: (nls: ListSettings) => void;
  active: boolean;
};
const TodoListSettings = ({
  listSettings,
  updateListSettings,
  active,
}: TodoListSettingsProps) => {
  const [title, set_title] = useState(listSettings.title);
  const [type, set_type] = useState(listSettings.type);
  const [icon, set_icon] = useState(listSettings.icon);

  const initValues = useCallback(() => {
    set_title(listSettings.title);
    set_type(listSettings.type);
    set_icon(listSettings.icon);
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
  }, [title, type, icon]);
  return (
    <div>
      <div className="field">
        <label htmlFor="name" className="label">
          name
        </label>
        <div className="control">
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => set_title(e.target.value)}
          />
        </div>
      </div>
      <div
        className="buttons has-addons"
        style={{
          display: "flex",
          maxWidth: 300,
        }}
      >
        <button
          className={`button ${
            type === "Todo" ? "is-active has-background-primary" : "is-disabled"
          }`}
          style={{
            flex: "1 1 0px",
          }}
          onClick={() => set_type("Todo")}
        >
          Todo
        </button>
        <button
          className={`button ${
            type === "Todo_Done"
              ? "is-active has-background-primary"
              : "is-disabled"
          }`}
          style={{
            flex: "1 1 0px",
          }}
          onClick={() => set_type("Todo_Done")}
        >
          Todo + Done
        </button>
      </div>
      <div className="field">
        <label htmlFor="icon" className="label">
          icon
        </label>
        <div className="control">
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              {matchIconWithElement(icon) || "no icon"}
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              <div className="dropdown-content">
                {Object.keys(AvailableIcons)
                  .filter((v) => isNaN(Number(v)))
                  .map((e) => {
                    return matchIconWithElement(
                      iconEnumFromName(e as "None" | "Camera"),
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="field">
        <button
          className="button is-danger"
          style={{
            float: "right",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoListSettings;

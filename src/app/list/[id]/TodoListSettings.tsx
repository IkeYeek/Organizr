import { useCallback, useEffect, useState } from "react";
import { TodoListType } from "@/business/TodoList";
import {
  AvailableIcons,
  iconEnumFromName,
  matchIconWithElement,
} from "@/business/AvailableIcons";

type TodoListSettingsProps = {
  name: string;
  type: TodoListType;
  icon: AvailableIcons;
  active: boolean;
};
const TodoListSettings = ({
  name: _name,
  type: _type,
  icon: _icon,
  active,
}: TodoListSettingsProps) => {
  const [name, set_name] = useState(_name);
  const [type, set_type] = useState(_type);
  const [icon, set_icon] = useState(_icon);

  const initValues = useCallback(() => {
    set_name(_name);
    set_type(_type);
    set_icon(_icon);
  }, [_name, _type, _icon]);
  useEffect(() => {
    initValues();
  }, [active, initValues]);
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
            value={name}
            onChange={(e) => set_name(e.target.value)}
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

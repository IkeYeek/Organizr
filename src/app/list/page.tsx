"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import TodoListContext from "@/app/list/TodoListContext";
import { Settings } from "react-feather";
import TodoListSettings, { ListSettings } from "@/app/list/TodoListSettings";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AvailableIcons,
  AvailableIconsAsStrings,
  iconEnumFromName,
} from "@/business/AvailableIcons";
import SimpleTodoList from "@/app/list/SimpleTodoList";
import TodoDoneList from "@/app/list/TodoDoneList";
import { invoke } from "@tauri-apps/api/tauri";
import {
  createTodoList,
  TodoList,
  TodoListStruct,
  TodoListType,
} from "@/business/TodoList";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { unsubscribe } from "diagnostics_channel";
import { route } from "@/business/Helpers";
import { NotificationType } from "@/business/Task";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalActive, setModalActive] = useState(
    searchParams.get("new") !== null,
  );
  let [t, st] = useState(false);
  let [id, setId] = useState(+searchParams.get("id")!);
  const context = useContext(TodoListContext);
  const [list, setList] = useState<TodoList | undefined>(undefined);
  const loadList = useCallback(() => {
    invoke<{
      id: number;
      tasks: [];
      title: string;
      icon: string;
      list_type: string;
    } | null>("pull_todo_list", { id }).then((tl) => {
      if (tl === null) {
        route("/", router).catch((e) => console.error(e));
      } else {
        let parsed_tl = createTodoList(
          tl.id,
          tl.title,
          iconEnumFromName(tl.icon as AvailableIconsAsStrings),
          tl.tasks,
          tl.list_type as TodoListType,
        );
        setList(parsed_tl);
        console.log(parsed_tl.tasks);
        setListSettings({
          title: parsed_tl.title,
          icon: parsed_tl.icon,
          type: parsed_tl.type,
        });
      }
    });
  }, [id, router]);

  useEffect(() => loadList(), [loadList]);
  useEffect(() => {
    let unlisten: UnlistenFn | undefined = undefined;
    listen<{ list_id: number }>("refresh-list", (e) => {
      if (list !== undefined && e.payload.list_id === list.id) loadList();
    }).then((e) => {
      unlisten = e;
    });
    return () => {
      if (unlisten !== undefined) unlisten();
    };
  }, [list, loadList]);
  const updateListSettings = useCallback(
    (newListSettings: ListSettings) => setListSettings(newListSettings),
    [],
  );

  const [listSettings, setListSettings] = useState<undefined | ListSettings>();

  if (list === undefined || listSettings === undefined)
    return <p>loading...</p>;

  const deleteList = () => {
    invoke("delete_list", {
      id: list.id,
    }).catch((e) => console.log(e));
    route("/", router).catch((e) => console.error(e));
  };

  return (
    <>
      <div className={"modal " + (modalActive ? "is-active" : "")}>
        <div
          className="modal-background"
          onClick={() => setModalActive(false)}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{`${list.title}'s settings`}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setModalActive(false)}
            ></button>
          </header>
          <section className={`modal-card-body ${styles["settings-section"]}`}>
            <TodoListSettings
              listSettings={listSettings}
              updateListSettings={updateListSettings}
              deleteList={deleteList}
              active={modalActive}
            />
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={() => {
                const l = {
                  ...list,
                  list_type: listSettings.type,
                  icon: listSettings.icon,
                  title: listSettings.title,
                };
                invoke("update_list", {
                  updatedList: l,
                }).catch((e) => console.error(e));
                setModalActive(false);
              }}
            >
              Save changes
            </button>
            <button className="button" onClick={() => setModalActive(false)}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
      <div className={"card has-background-info"}>
        <header className="card-header">
          <div className="card-header-title">
            {list.title}
            <button
              className={`button is-rounded is-dark ${styles["settings-icon"]}`}
              onClick={() => setModalActive(true)}
            >
              <Settings />
            </button>
          </div>
        </header>
        <div className="card-content">
          {list.type === "Todo" ? (
            <SimpleTodoList
              list={list}
              updateTask={(task) => {
                invoke("update_task_in_list", {
                  id: list!.id,
                  task,
                }).catch((e) => console.error(e));
              }}
            />
          ) : (
            <TodoDoneList
              list={list}
              updateTask={(task) => {
                context.updateTaskInList(list, task);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

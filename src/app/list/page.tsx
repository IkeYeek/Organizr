"use client"; // ikik next time I won't use Next for this kind of architecture I promise
import { useCallback, useEffect, useState } from "react";
import { Settings } from "react-feather";
import TodoListSettings, { ListSettings } from "@/app/list/TodoListSettings";
import styles from "./styles/page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AvailableIconsAsStrings,
  iconEnumFromName,
} from "@/business/AvailableIcons";
import SimpleTodoList from "@/app/list/SimpleTodoList";
import TodoDoneList from "@/app/list/TodoDoneList";
import { invoke } from "@tauri-apps/api/tauri";
import { createTodoList, TodoList, TodoListType } from "@/business/TodoList";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { route } from "@/business/Helpers";
import { Task } from "@/business/Task";
import TodoListComponent from "@/app/list/TodoList";

const Page = () => {
  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);
  let [id, setId] = useState(NaN);
  const [list, setList] = useState<TodoList | undefined>(undefined);
  const loadList = useCallback(() => {
    invoke<{
      id: number;
      tasks: [Task];
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
          tl.tasks.map((t) => {
            return {
              ...t,
              due: t.due ? t.due * 1000 : t.due,
            };
          }),
          tl.list_type as TodoListType,
        );
        setList(parsed_tl);
        setListSettings({
          title: parsed_tl.title,
          icon: parsed_tl.icon,
          type: parsed_tl.type,
        });
      }
    });
  }, [id, router]);

  useEffect(() => {
    if (isNaN(id)) {
      const searchParams = new URLSearchParams(window.location.search); // yeahhhh so, basically having to do static export makes the use of dynamic routing impossible. Let's use useSearchParams then right ? wellll, not in page... Did I discover that long after having it working because it f*cked up arm build ? yes... so let's get to old js
      const maybeId = searchParams.get("id");
      if (maybeId !== null) {
        setId(+maybeId);
      }
    }
  }, [id]);

  useEffect(() => {
    if (!isNaN(id)) {
      loadList();
    }
  }, [id, loadList]);

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
    }).catch((e) => console.error(e));
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
      <TodoListComponent
        list={list}
        setModalActive={() => setModalActive(true)}
      />
    </>
  );
};

export default Page;

"use client"; // ikik next time I won't use Next for this kind of architecture I promise
import { useCallback, useEffect, useState } from "react";
import TodoListSettings, { ListSettings } from "@/app/list/TodoListSettings";
import styles from "./styles/page.module.scss";
import { useRouter } from "next/navigation";
import { TodoList } from "@/business/TodoList";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { route } from "@/business/Helpers";
import TodoListComponent from "@/app/list/TodoListComponent";
import { useAppContext } from "@/app/AppContext";

const Page = () => {
  const router = useRouter();
  const context = useAppContext();

  const [modalActive, setModalActive] = useState(false);
  const [listSettings, setListSettings] = useState<undefined | ListSettings>();
  let [id, setId] = useState(NaN);
  const [list, setList] = useState<TodoList | undefined>(undefined);

  const loadList = useCallback(() => {
    context
      .pull_todo_list(id)
      .then((resultingList) => {
        setList(resultingList);
        setListSettings({
          title: resultingList.title,
          icon: resultingList.icon,
          type: resultingList.type,
        });
      })
      .catch(() => route("/", router).catch((e) => console.error(e)));
  }, [context, id, router]);
  const updateList = useCallback(() => {
    if (listSettings !== undefined && list !== undefined) {
      const l: TodoList = {
        ...list,
        type: listSettings.type,
        icon: listSettings.icon,
        title: listSettings.title,
      };
      context.update_list(l).catch((e) => console.error(e));
    }
  }, [context, list, listSettings]);

  const updateListSettings = useCallback(
    (newListSettings: ListSettings) => setListSettings(newListSettings),
    [],
  );

  const deleteList = useCallback(() => {
    if (list !== undefined) {
      context
        .delete_list(id)
        .then(() => route("/", router).catch((e) => console.error(e)));
    }
  }, [context, id, list, router]);

  useEffect(() => {
    if (isNaN(id)) {
      const searchParams = new URLSearchParams(window.location.search); // yeahhhh so, basically having to do static export makes the use of dynamic routing impossible. Let's use useSearchParams then right ? wellll, not in page... Did I discover that long after having it working because it f*cked up arm build ? yes... so let's get to old js
      const maybeId = searchParams.get("id");
      const maybeNew = searchParams.get("new");
      if (maybeId !== null) setId(+maybeId);
      if (maybeNew !== null) setModalActive(true);
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

  if (list === undefined || listSettings === undefined)
    return <p>loading...</p>;
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
                updateList();
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

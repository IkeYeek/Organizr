"use client";
import { useContext, useState } from "react";
import TodoListContext from "@/app/TodoListContext";
import { Settings } from "react-feather";
import TodoListSettings, {
  ListSettings,
} from "@/app/list/[id]/TodoListSettings";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { AvailableIcons } from "@/business/AvailableIcons";
import SimpleTodoList from "@/app/list/[id]/SimpleTodoList";

const Page = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalActive, setModalActive] = useState(
    searchParams.get("new") !== null,
  );
  const context = useContext(TodoListContext);
  const lists = context.lists;
  const list = lists.filter((list) => list.id === +params.id).pop()!;
  if (list === undefined) router.push("/");
  const deleteList = () => {
    context.deleteList(list);
  };

  const [listSettings, setListSettings] = useState<ListSettings>(
    list === undefined
      ? { title: "", icon: AvailableIcons.None, type: "Todo" }
      : {
          title: list.title,
          icon: list.icon,
          type: list.type,
        },
  );
  if (list === undefined) return <></>;

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
              updateListSettings={(newListSettings: ListSettings) =>
                setListSettings(newListSettings)
              }
              deleteList={deleteList}
              active={modalActive}
            />
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={() => {
                context.updateList({
                  ...list,
                  type: listSettings.type,
                  icon: listSettings.icon,
                  title: listSettings.title,
                });
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
          <SimpleTodoList
            list={list}
            updateTask={(task) => {
              context.updateTask(list, task);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Page;

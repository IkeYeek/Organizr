"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { TodoList } from "@/business/TodoList";
import { useAppContext } from "@/app/AppContext";
import { route } from "@/business/Helpers";
import { listen } from "@tauri-apps/api/event";
import styles from "@/app/styles/page.module.scss";
import ListLink from "@/app/list/ListLink";
import CreateList from "@/app/list/CreateList";

export default function Home() {
  const router = useRouter();
  const [todo_lists, setTodoLists] = useState<undefined | TodoList[]>(
    undefined,
  );
  const context = useAppContext();

  const handleCreateList = useCallback(() => {
    context
      .create_todo_list()
      .then((l) => {
        route(encodeURI(`/list?id=${l.id}&new`), router).catch((e) =>
          console.error(e),
        );
      })
      .catch((e) => console.error(e));
  }, [context, router]);

  const load = useCallback(
    () => context.pull_todo_lists().then((lists) => setTodoLists(lists)),
    [context],
  );

  useEffect(() => {
    const unlisten = listen("refresh-lists", async () => {
      await load();
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, [load]);
  useEffect(() => {
    let loader = async () => {
      await context.pull_todo_lists().then((lists) => setTodoLists(lists));
    };
    loader().catch((e) => console.error(e));
  }, [context, load]);

  if (todo_lists === undefined) return <p>loading...</p>;
  return (
    <div className={styles.main}>
      {todo_lists.map((todo_list) => {
        return <ListLink todo_list={todo_list} key={todo_list.id} />;
      })}
      <CreateList handleCreateList={handleCreateList} />
    </div>
  );
}

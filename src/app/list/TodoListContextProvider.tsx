"use client";
import React, { ReactNode, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "react-feather";
import { route } from "@/business/Helpers";
const TodoListContextProvider = ({ content }: { content: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const back = useCallback(() => {
    route("/", router).catch((e) => console.error(e));
  }, [router]);

  return (
    <>
      {pathname !== "/" && (
        <button
          className={"button has-background-info"}
          style={{
            border: "none",
            borderRadius: 0,
            position: "relative",
            top: 3,
            zIndex: 2,
          }}
          onClick={() => back()}
        >
          <ArrowLeft />
        </button>
      )}
      {content}
    </>
  );
};

export default TodoListContextProvider;

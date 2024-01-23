"use client";
import React, { ReactNode, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "react-feather";
import { route } from "@/business/Helpers";
import AppContextProvider from "@/app/AppContext";
const CSRLayout = ({ content }: { content: ReactNode }) => {
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
      <AppContextProvider>{content}</AppContextProvider>
    </>
  );
};

export default CSRLayout;

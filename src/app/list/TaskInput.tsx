import React, { ChangeEvent } from "react";
import EnhancedTextInput from "@/business/EnhancedTextInput";
import styles from "@/app/list/styles/taskcomponent.module.scss";

const TaskInput = (props: {
  value: string;
  onChange: (e: string) => void;
  onChange1: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  textAreaRef: React.Ref<HTMLTextAreaElement>;
  onFocus: () => void;
  textAreaElement: HTMLTextAreaElement | null;
  textAreaFocused: boolean;
  onBlur: () => void;
}) => {
  return (
    <EnhancedTextInput value={props.value} onChange={props.onChange}>
      <textarea
        value={props.value}
        onChange={props.onChange1}
        className={`has-background-grey-dark ${styles.input}`}
        ref={props.textAreaRef}
        contentEditable
        onFocus={props.onFocus}
        style={{
          height: "auto",
          minHeight:
            props.textAreaElement !== null
              ? props.textAreaFocused
                ? props.textAreaElement.scrollHeight
                : Math.min(props.textAreaElement.scrollHeight, 100)
              : 0,
        }}
        onBlur={props.onBlur}
      />
    </EnhancedTextInput>
  );
};

export default TaskInput;

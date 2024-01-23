import { ReactNode, useState } from "react";
import styles from "./enhancedtextinput.module.scss";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const EnhancedTextInput = ({
  children,
  value,
  onChange,
}: {
  children: ReactNode;
  value: string;
  onChange: (s: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <>
      <div onFocus={() => setFocused(true)}>
        {focused && (
          <div className={`${styles["active-background"]}`}>
            <div
              onClick={() => setFocused(false)}
              style={{
                width: "100%",
                height: "100%",
              }}
            ></div>
            <div className={styles.keyboard}>
              <KeyboardReact
                onInit={(i) => i.setInput(value)}
                onChange={(v) => onChange(v)}
              />
            </div>
          </div>
        )}
        <div className={`${focused && styles["active-input"]}`}>{children}</div>
      </div>
    </>
  );
};

export default EnhancedTextInput;

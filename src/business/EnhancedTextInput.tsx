import { ReactNode, useState } from "react";
import styles from "./enhancedtextinput.module.scss";

const EnhancedTextInput = ({ children }: { children: ReactNode }) => {
  const [focused, setFocused] = useState(false);
  return (
    <>
      <div onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
        {focused && <div className={`${styles["active-background"]}`}></div>}
        <div className={`${focused && styles["active-input"]}`}>{children}</div>
      </div>
    </>
  );
};

export default EnhancedTextInput;

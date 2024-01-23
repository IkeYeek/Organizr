import { ReactNode, useCallback, useState } from "react";
import styles from "./enhancedtextinput.module.scss";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
enum CapsState {
  LOWER,
  SHIFT,
  UPPER,
}

const layouts = {
  default: [
    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w e r t y u i o p [ ] \\",
    "{lock} a s d f g h j k l ; ' {enter}",
    "{shift} z x c v b n m , . / {shift}",
    ".com @ {space}",
  ],
  shift: [
    "~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}",
    "{tab} Q W E R T Y U I O P { } |",
    '{lock} A S D F G H J K L : " {enter}',
    "{shift} Z X C V B N M &lt; &gt; ? {shift}",
    ".com @ {space}",
  ],
};
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
  const [layoutName, setLayoutName] = useState("default");
  const [capsState, setCapsState] = useState(CapsState.LOWER);
  const layoutFromCapsState = useCallback((currState: CapsState): string => {
    let layout: string;
    switch (currState) {
      case CapsState.SHIFT:
      case CapsState.UPPER:
        layout = "shift";
        break;
      default:
        layout = "default";
    }
    return layout;
  }, []);

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
                layout={layouts}
                layoutName={layoutName}
                onKeyReleased={(b) => {
                  let newCapsState: CapsState;
                  switch (b) {
                    case "{enter}":
                      newCapsState = capsState;
                      setFocused(false);
                      break;
                    case "{shift}":
                      newCapsState =
                        capsState === CapsState.SHIFT
                          ? CapsState.LOWER
                          : CapsState.SHIFT;
                      break;
                    case "{lock}":
                      newCapsState =
                        capsState === CapsState.UPPER
                          ? CapsState.LOWER
                          : CapsState.UPPER;
                      break;
                    default:
                      newCapsState =
                        capsState === CapsState.SHIFT
                          ? CapsState.LOWER
                          : capsState;
                      break;
                  }
                  setCapsState(newCapsState);
                  setLayoutName(layoutFromCapsState(newCapsState));
                }}
              />
            </div>
          </div>
        )}
        <div
          className={`${styles.childrens} ${focused && styles["active-input"]}`}
        >
          <div
            className={
              focused
                ? styles["active-input-translateY"]
                : styles["inactive-input-translateY"]
            }
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedTextInput;

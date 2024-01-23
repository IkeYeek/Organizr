import { ReactNode } from "react";

const EnhancedTextInput = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        onFocus={() => console.log("test")}
        onBlur={() => console.log("retest")}
      >
        {children}
      </div>
    </>
  );
};

export default EnhancedTextInput;

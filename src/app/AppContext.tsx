import { createContext, ReactNode } from "react";

type AppContextType = {};
const AppContext = createContext<AppContextType>({});
const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
export { AppContext };
export type { AppContextType };

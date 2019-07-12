import React, { useReducer } from "react";
import responsiveReducer from "./responsiveReducer";
export * from "./responsiveActions";

export const ResponsiveContext = React.createContext({});

export default function ResponsiveContextProvider({ children }) {
  const [state, dispatch] = useReducer(responsiveReducer, {});
  return (
    <ResponsiveContext.Provider value={[state, dispatch]}>
      {children}
    </ResponsiveContext.Provider>
  );
}

import React, { useReducer } from "react";
import tableReducer from "./tableReducer";
export * from "./tableActions";

export const TableContext = React.createContext({});

export default function TableContextProvider({ children }) {
  const [state, dispatch] = useReducer(tableReducer, {});
  return (
    <TableContext.Provider value={[state, dispatch]}>
      {children}
    </TableContext.Provider>
  );
}

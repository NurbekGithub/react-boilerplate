import React, { useContext } from "react";
import MuiRemoteTable from "./MuiRemoteTable";
import { TableContext, registerTable } from "../../globalContexts/TableContext";

function MuiTable({ query = {}, remote = true, ...rest }) {
  const initialState = {
    // controlled
    selectedRows: [],
    isAllSelected: false,
    isIndeterminated: false,

    // uncontrolled
    data: [],
    total: 0,
    page: 0,
    per_page: 20,
    search: "",
    propFilters: {},
    isLoading: false,
    order: "", // 'desc' | 'asc' | ''
    orderBy: "",
    ...query
  };
  const dispatch = useContext(TableContext)[1];
  dispatch(registerTable(rest.tableName, initialState));
  if (remote) {
    return <MuiRemoteTable {...rest} initialState={initialState} />;
  }
}

export default React.memo(MuiTable);

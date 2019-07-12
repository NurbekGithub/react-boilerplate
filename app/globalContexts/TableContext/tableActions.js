export const REGISTER_TABLE = "REGISTER_TABLE";
export const SET_TABLE_STATE = "SET_TABLE_STATE";
export const REQUEST_SORT = "REQUEST_SORT";
export const SELECT_ALL = "SELECT_ALL";
export const SELECT_ROW = "SELECT_ROW";

export function registerTable(tableName, initialData) {
  return {
    type: REGISTER_TABLE,
    tableName,
    initialData
  };
}

export function setTableData(tableName, data) {
  return {
    type: SET_TABLE_STATE,
    tableName,
    data
  };
}

export function handleRequestSort(tableName, field) {
  return {
    type: REQUEST_SORT,
    tableName,
    field
  };
}

export function handleSelectAll(tableName) {
  return {
    type: SELECT_ALL,
    tableName
  };
}

export function handleSelectRow(tableName, _id, select) {
  return {
    type: SELECT_ROW,
    tableName,
    _id,
    select
  };
}

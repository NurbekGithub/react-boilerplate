import {
  REGISTER_TABLE,
  SET_TABLE_STATE,
  REQUEST_SORT,
  SELECT_ALL,
  SELECT_ROW
} from "./tableActions";
import union from "lodash/union";
import concat from "lodash/concat";
import without from "lodash/without";
import difference from "lodash/difference";

export default function tableReducer(state, action) {
  switch (action.type) {
    case REGISTER_TABLE:
      if (state[action.tableName]) return state;
      return {
        ...state,
        [action.tableName]: action.initialData
      };
    case SET_TABLE_STATE:
      return {
        ...state,
        [action.tableName]: {
          ...state[action.tableName],
          ...action.data
        }
      };
    case SELECT_ALL: {
      const table = state[action.tableName];
      const ids = table.data.map(obj => obj._id);
      const operation = table.isAllSelected ? difference : union;
      return {
        ...state,
        [action.tableName]: {
          ...table,
          isIndeterminated: false,
          isAllSelected: !table.isAllSelected,
          selectedRows: operation(table.selectedRows, ids)
        }
      };
    }
    case SELECT_ROW: {
      const table = state[action.tableName];
      const ids = table.data.map(obj => obj._id);
      const operation = action.select ? concat : without;
      const newSelectedRows = operation(table.selectedRows, action._id);
      const isAllSelected = difference(ids, newSelectedRows).length === 0;
      const isIndeterminated =
        !isAllSelected && newSelectedRows.some(_id => ids.includes(_id));
      return {
        ...state,
        [action.tableName]: {
          ...table,
          isAllSelected,
          isIndeterminated,
          selectedRows: operation(table.selectedRows, action._id)
        }
      };
    }
    case REQUEST_SORT:
      if (action.field === state[action.tableName].orderBy) {
        // if it is already sorted by the field
        const isAsc = state[action.tableName].order === "desc";
        // if it ask make it desc
        if (isAsc) {
          return {
            ...state,
            [action.tableName]: {
              ...state[action.tableName],
              orderBy: action.field,
              order: "asc"
            }
          };
        } else {
          // if it desc make it reset all
          return {
            ...state,
            [action.tableName]: {
              ...state[action.tableName],
              orderBy: "",
              order: ""
            }
          };
        }
      } else {
        // if it is not sorted by the field
        return {
          ...state,
          [action.tableName]: {
            ...state[action.tableName],
            orderBy: action.field,
            order: "desc"
          }
        };
      }
    default:
      return state;
  }
}

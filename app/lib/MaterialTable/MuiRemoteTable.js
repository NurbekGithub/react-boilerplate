import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHeadComponent from "./TableHeadComponent";
import Paper from "@material-ui/core/Paper";
import TableBodyComponent from "./TableBodyComponent";
import {
  TableContext,
  setTableData,
  handleRequestSort,
  handleSelectAll,
  handleSelectRow
} from "../../globalContexts/TableContext";
import TableFilters from "./TableFilters";
import { CircularProgress } from "@material-ui/core";
import { usePrevious } from "../../utils";
import TablePaginationComponent from "./TablePaginationComponent";

const DEBOUNCE_TIME = 500;

const useStyles = makeStyles(theme => ({
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    position: "relative"
  },
  table: ({ minWidth }) => ({
    minWidth: minWidth || 750
  }),
  tableWrapper: {
    overflowX: "auto"
  },
  loader: {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .12)",
    alignItems: "center"
  }
}));

export default function MuiRemoteTable(props) {
  const {
    filters,
    initialState,
    headerProps,
    bodyProps,
    paginationProps,
    tableProps,
    fetchData,
    tableName,
    isBordered,
    isSelectable,
    minWidth,
    columns
  } = props;
  const [state, dispatch] = useContext(TableContext);
  const {
    isLoading,
    data,
    total,
    isAllSelected,
    isIndeterminated,
    order,
    orderBy,
    propFilters,
    selectedRows,
    search,
    page,
    per_page
  } = state[tableName] || initialState;

  // build props for components
  const _headerProps = {
    ...headerProps,
    isAllSelected,
    isSelectable,
    isBordered,
    columns,
    isIndeterminated,
    onSelectAllClick: () => dispatch(handleSelectAll(tableName)),
    onRequestSort: field => dispatch(handleRequestSort(tableName, field)),
    order,
    orderBy
  };
  const _filterProps = {
    search,
    propFilters,
    handleSearch: e => {
      dispatch(setTableData(tableName, { search: e.target.value }));
    }
  };
  const _bodyProps = {
    ...bodyProps,
    data,
    selectedRows,
    isSelectable,
    handleSelectRow: ({ target: { name, checked } }) =>
      dispatch(handleSelectRow(tableName, name, checked)),
    columns,
    total,
    isBordered
  };
  const _paginationProps = {
    ...paginationProps,
    page,
    total,
    per_page,
    handleChangePage: page => dispatch(setTableData(tableName, { page })),
    handleChangeRowsPerPage: e =>
      dispatch(
        setTableData(tableName, { per_page: parseInt(e.target.value, 10) })
      )
  };

  const classes = useStyles({ minWidth });
  // build query
  const query = {
    order,
    orderBy,
    propFilters,
    search,
    page,
    per_page
  };

  function request(query) {
    dispatch(setTableData(tableName, { isLoading: true }));
    fetchData(query)
      .then(res => {
        dispatch(setTableData(tableName, res));
      })
      .finally(() => {
        dispatch(setTableData(tableName, { isLoading: false }));
      });
  }

  const searchPrevValue = usePrevious(search);

  useEffect(() => {
    if (searchPrevValue !== search) {
      const timerid = setTimeout(() => {
        request(query);
      }, DEBOUNCE_TIME);
      return () => clearTimeout(timerid);
    }
    request(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, per_page, order, orderBy, propFilters]);
  return (
    <Paper className={classes.paper}>
      {isLoading && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
      <TableFilters {..._filterProps} filters={filters} />
      <div className={classes.tableWrapper}>
        <Table className={classes.table} size="small" {...tableProps}>
          <TableHeadComponent {..._headerProps} />
          <TableBodyComponent {..._bodyProps} />
        </Table>
      </div>
      <TablePaginationComponent {..._paginationProps} />
    </Paper>
  );
}

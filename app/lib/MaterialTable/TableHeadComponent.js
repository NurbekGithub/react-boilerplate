import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light
  },
  cell: ({ isBordered }) => ({
    padding: "14px",
    color: "#000",
    borderLeft: isBordered ? `1px solid ${theme.palette.primary.main}` : "none"
  })
}));

function TableHeadComponent(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    isIndeterminated,
    onRequestSort,
    isBordered,
    columns,
    isSortable,
    isAllSelected,
    tableHeadProps,
    isSelectable,
    allowMiltiSelect,
    tableHeadRowProps
  } = props;

  const classes = useStyles({ isBordered });
  const createSortHandler = field => () => {
    onRequestSort(field);
  };

  return (
    <TableHead className={classes.root} {...tableHeadProps}>
      <TableRow {...tableHeadRowProps}>
        {isSelectable && (
          <TableCell padding="checkbox">
            {allowMiltiSelect && (
              <Checkbox
                indeterminate={isIndeterminated}
                checked={isAllSelected}
                onChange={onSelectAllClick}
              />
            )}
          </TableCell>
        )}
        {columns.map(col => (
          <TableCell
            key={col.field}
            align="center"
            className={classes.cell}
            variant="head"
            sortDirection={orderBy === col.field ? order : false}
            {...col.thProps}
          >
            {isSortable ? (
              <TableSortLabel
                active={orderBy === col.field}
                direction={order || undefined}
                onClick={createSortHandler(col.field)}
              >
                {col.title}
              </TableSortLabel>
            ) : (
              col.title
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeadComponent;

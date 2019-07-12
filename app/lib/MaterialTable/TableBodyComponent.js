import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  cell: ({ isBordered }) => ({
    borderLeft: isBordered ? `1px solid #e0e0e0` : "none"
  })
}));

export default function TableBodyComponent(props) {
  const {
    data,
    handleRowClick,
    isBordered,
    selectedRows,
    columns,
    isSelectable,
    handleSelectRow
  } = props;
  const classes = useStyles({ isBordered });
  return (
    <TableBody>
      {data.map(row => {
        const isSelected = selectedRows.indexOf(row._id) !== -1;
        return (
          <TableRow
            hover
            onClick={handleRowClick ? () => handleRowClick(row) : undefined}
            aria-checked={isSelected}
            tabIndex={-1}
            key={row._id}
            selected={isSelected}
          >
            {isSelectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  name={row._id}
                  checked={isSelected}
                  onChange={handleSelectRow}
                />
              </TableCell>
            )}
            {columns.map(col => {
              const fieldValue = row[col.field] || "";
              const value = col.render
                ? col.render(fieldValue, row)
                : fieldValue;
              return (
                <TableCell
                  key={col.field}
                  className={classes.cell}
                  {...col.thProps}
                >
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

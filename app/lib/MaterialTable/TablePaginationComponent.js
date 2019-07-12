import React from "react";
import { TablePagination, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon
} from "@material-ui/icons";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick() {
    onChangePage(0);
  }

  function handleBackButtonClick() {
    onChangePage(page - 1);
  }

  function handleNextButtonClick() {
    onChangePage(page + 1);
  }

  function handleLastPageButtonClick() {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

export default function TablePaginationComponent(props) {
  const {
    rowsPerPageOptions,
    total,
    page,
    per_page,
    handleChangePage,
    handleChangeRowsPerPage
  } = props;
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions || [10, 20, 50]}
      component="div"
      count={total}
      rowsPerPage={per_page}
      page={page}
      backIconButtonProps={{
        "aria-label": "Previous Page"
      }}
      nextIconButtonProps={{
        "aria-label": "Next Page"
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
}

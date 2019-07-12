import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input, InputAdornment } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px"
  },
  filters: {
    flex: 1,
    display: "flex"
  },
  search: {
    flex: "0 0 300px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    width: "100%"
  },
  iconButton: {
    padding: 10
  }
}));

function renderFilterByType(filter) {
  return <span>asd</span>;
}

export default function TableFilters({ filters, search, handleSearch }) {
  const { t } = useTranslation();
  const classes = useStyles();
  if (!filters) return null;
  const { allowSearch, propFilters = [], filtersComponent } = filters;
  return (
    <div className={classes.root}>
      {filtersComponent ? (
        filtersComponent
      ) : (
        <ul className={classes.filters}>
          {propFilters.map(renderFilterByType)}
        </ul>
      )}
      {allowSearch && (
        <div className={classes.search}>
          <Input
            value={search}
            onChange={handleSearch}
            type="search"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            className={classes.input}
            placeholder={t("search")}
          />
        </div>
      )}
    </div>
  );
}

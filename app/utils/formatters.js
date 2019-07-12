import { isDate, isValid, format } from "date-fns";

export function formatDateAndTime(timestamp) {
  const date = new Date(timestamp);
  return isDate(date) && isValid(date)
    ? format(date, "dd.MM.yyyy hh:mm:ss")
    : "";
}

export function temporarelyAddOneToPage(page) {
  return Number(page) + 1;
}

export function temporarelyDistractOneFromPage(page) {
  return Number(page) - 1;
}

import React, { useContext } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import { LngContext } from './globalContexts/LngContext';

const localeMap = {
  en,
  ru,
  kk: ru,
};

export default function MuiPickersProvider({ children }) {
  const [lng] = useContext(LngContext);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[lng]}>
      {children}
    </MuiPickersUtilsProvider>
  );
}

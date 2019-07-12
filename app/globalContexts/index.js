import React from 'react';
import UserContextProvider from './UserContext';
import LngContextProvider from './LngContext';
import TableContextProvider from './TableContext';

export default function GlobalContext({ children }) {
  return (
    <UserContextProvider>
      <LngContextProvider>
        <TableContextProvider>{children}</TableContextProvider>
      </LngContextProvider>
    </UserContextProvider>
  );
}

import React, { useState } from 'react';

export const LngContext = React.createContext(['ru']);

export default function LngContextProvider({ children }) {
  const [lng, setLng] = useState('ru');
  return (
    <LngContext.Provider value={[lng, setLng]}>{children}</LngContext.Provider>
  );
}

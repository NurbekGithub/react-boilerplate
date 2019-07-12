import React, { useState } from "react";

export const UserContext = React.createContext([null]);

const mockUser = localStorage.getItem("token")
  ? {
      role: "systemAdmin"
    }
  : null;

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(mockUser);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

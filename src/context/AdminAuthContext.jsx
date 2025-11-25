import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState("");

  return (
    <AdminAuthContext.Provider value={{ adminToken, setAdminToken }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

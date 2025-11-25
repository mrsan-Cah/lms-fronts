import { createContext, useState } from "react";

export const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null);

  return (
    <StudentAuthContext.Provider value={{ studentData, setStudentData }}>
      {children}
    </StudentAuthContext.Provider>
  );
};

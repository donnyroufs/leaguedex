import React, { createContext, useContext, useState } from "react";

const statusContext = createContext();

export const StatusProvider = ({ children }) => {
  const status = useStatusProvider();
  return (
    <statusContext.Provider value={status} displayName="Status">
      {children}
    </statusContext.Provider>
  );
};

export const useStatus = () => {
  return useContext(statusContext);
};

const useStatusProvider = () => {
  const [status, setStatus] = useState(null);

  return {
    status,
    setStatus,
  };
};

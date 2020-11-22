import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const status = useSidebarProvider();
  return (
    <SidebarContext.Provider value={status} displayName="Status">
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};

const useSidebarProvider = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleClick = () => {
    setIsOpen((curr) => !curr);
  };

  return {
    isOpen,
    handleClick,
  };
};

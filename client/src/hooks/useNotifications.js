import React, { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const notifications = useNotificationsProvider();
  return (
    <NotificationsContext.Provider
      value={notifications}
      displayName="Notifications"
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationsContext);
};

const useNotificationsProvider = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      championA: "Akali",
      championB: "Renekton",
      lane: "top",
      win: true,
    },
    {
      id: 2,
      championA: "Jayce",
      championB: "Anivia",
      lane: "mid",
      win: false,
    },
  ]);

  return {
    notifications,
  };
};

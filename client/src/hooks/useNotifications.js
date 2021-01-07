import React, { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api";
import { useAuth } from "./useAuth";
import { useMatch } from "./useMatch";

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
  const { activeSummonerId } = useMatch();
  const { user } = useAuth();

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

  // Get the last registered date
  useEffect(() => {
    if (!activeSummonerId || !user) return;

    const currentSummoner = user.summoner.find(
      (s) => s.accountId === activeSummonerId
    );

    API.playground(currentSummoner.id);
  }, [activeSummonerId, user]);

  return {
    notifications,
  };
};

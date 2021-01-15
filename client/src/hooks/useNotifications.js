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

  const [notifications, setNotifications] = useState([]);

  // Get the last registered date
  // TODO: Fix bug where it doesn't find the ID upon creating a new account.
  // useEffect(() => {
  //   if (!activeSummonerId || !user) return;
  //   if (user.summoner.length <= 0) return;
  //
  //   const currentSummoner = user.summoner.find(
  //     (s) => s.accountId === activeSummonerId
  //   );

  //   API.playground(currentSummoner.id);
  // }, [activeSummonerId, user]);

  useEffect(() => {
    if (!user) return;

    const currentSummoner = user.summoner.find(
      (s) => s.accountId === activeSummonerId
    );

    // summonerId need to rename in prisma
    if (!currentSummoner) return;

    API.getMatchNotifications(currentSummoner.id, currentSummoner.summonerId)
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, [user]);

  return {
    notifications,
  };
};

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
  const [loading, setLoading] = useState(false);
  const { activeSummonerId, afterUpdateNotifications } = useMatch();
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user || !activeSummonerId) return;

    const currentSummoner = user.summoner.find(
      (s) => s.accountId === activeSummonerId
    );

    if (!currentSummoner) return;

    API.getMatchNotifications(currentSummoner.id, currentSummoner.summonerId)
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, [user]);

  async function updateNotifications(payload) {
    if (!activeSummonerId) {
      return null;
    }

    const currentSummoner = user.summoner.find(
      (s) => s.accountId === activeSummonerId
    );

    if (!currentSummoner) {
      return null;
    }

    setLoading(true);

    const response = await API.updateMatchNotifications(
      payload,
      currentSummoner.summonerId
    ).catch((err) => console.log(err));

    const isSuccess = response.status === 201;

    if (isSuccess) {
      const updatedNotifications = notifications.filter(
        (n) => !Object.keys(payload).includes(n.id)
      );
      setNotifications(updatedNotifications);

      // Get json data of current matchups and pass to afterUpdate
      // await afterUpdateNotifications(data).catch(
      //   (err) => {
      //     console.log(err);
      //   }
      // );
    }

    setLoading(false);

    return isSuccess;
  }

  return {
    notifications,
    updateNotifications,
    loading,
  };
};

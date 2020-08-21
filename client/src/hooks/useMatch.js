import React, { useEffect, createContext, useContext, useState } from "react";
import * as Timer from "../helpers/gameTimer";
import { getToken } from "../helpers/getToken";

const matchContext = createContext();

export const MatchProvider = ({ children }) => {
  const match = useMatchProvider();
  return (
    <matchContext.Provider value={match} displayName="Match">
      {children}
    </matchContext.Provider>
  );
};

export const useMatch = () => {
  return useContext(matchContext);
};

const useMatchProvider = () => {
  const [match, setMatch] = useState(null);
  const [timer, setTimer] = useState("0:00");
  const [loading, setLoading] = useState(false);

  const findMatch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/matchup/find`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        credentials: "include",
      });
      const data = await res.json();
      setMatch(data.hasOwnProperty("status") ? null : data);
      setLoading(false);
      return !data.hasOwnProperty("status");
    } catch (err) {
      setLoading(false);
    }
  };

  const createMatchup = async (opponent_id, lane) => {
    try {
      const payload = {
        lane,
        opponent_id: Number(opponent_id),
        champion_id: match.me.id,
        game_id: String(match.gameId),
      };

      const res = await fetch(`/api/matchup/create`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        credentials: "include",
      });
      const { id, confirmed } = await res.json();
      setMatch((old) => ({
        ...old,
        confirmed,
      }));
      return id;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (match && match.confirmed) {
      const timer = setInterval(() => {
        const miliseconds = Timer.calculateGameTime(match.startTime + 30000);
        const { formatted } = Timer.formatTime(miliseconds);
        setTimer(formatted);
      }, 1000);

      return () => {
        clearInterval(timer);
        setTimer("0:00");
      };
    }
  }, [match]);

  useEffect(() => {
    return () => {
      setMatch(null);
    };
  }, []);

  return {
    match,
    setMatch,
    loading,
    findMatch,
    createMatchup,
    hasMatch: !!match,
    confirmed: match && match.confirmed,
    timer,
    minutes: timer.split(":")[0],
  };
};

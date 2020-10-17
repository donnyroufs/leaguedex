import React, { useEffect, createContext, useContext, useState } from "react";
import { build, loadAssets } from "../helpers/loadImages";
import makeRequest from "../helpers/makeRequest";

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
  const [loading, setLoading] = useState(false);

  const findMatch = async () => {
    setLoading(true);
    try {
      const res = await makeRequest(`/api/matchup/find`);
      const data = await res.json();
      if (data.hasOwnProperty("status")) {
        setMatch(null);
      } else {
        const assets = build(data.opponents, 5);
        await loadAssets(assets);
        setMatch(data);
      }
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

      const res = await makeRequest(`/api/matchup/create`, {
        method: "POST",
        body: JSON.stringify(payload),
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

  const revertMatch = (history) => {
    setMatch((currentValue) => ({
      ...currentValue,
      confirmed: false,
    }));

    history.push(`/match/${match.matchId}`);
  };

  return {
    match,
    setMatch,
    setLoading,
    loading,
    findMatch,
    createMatchup,
    hasMatch: !!match,
    confirmed: match && match.confirmed,
    revertMatch,
    isLive: (dex) => dex && match && Number(dex.game_id) === match.gameId,
  };
};

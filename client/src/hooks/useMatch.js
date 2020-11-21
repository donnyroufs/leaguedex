import React, { createContext, useContext, useState } from "react";
import { build, loadAssets } from "../helpers/loadImages";
import makeRequest from "../helpers/makeRequest";
import { API } from "../api/";
import useLocalStorage from "react-use-localstorage";

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
  const [activeSummonerId, setActiveSummonerId] = useLocalStorage(
    "LEAGUEDEX_ACTIVE_SUMMONER"
  );
  const [match, setMatch] = useState(null);
  const [btnText, setBtnText] = useState("Go To Match");
  const [dex, setDex] = useState(null);
  const [loading, setLoading] = useState(false);

  const findMatch = async () => {
    setLoading(true);
    try {
      const res = await API.fetchFindMatch(activeSummonerId);
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

  async function finishMatch(match) {
    try {
      const data = await API.fetchLatest(match.gameId);
      return data;
    } catch (_) {
      return null;
    }
  }
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
    dex,
    setDex,
    setLoading,
    loading,
    findMatch,
    createMatchup,
    hasMatch: !!match,
    confirmed: match && match.confirmed,
    revertMatch,
    isLive: (dex) => dex && match && Number(dex.game_id) === match.gameId,
    finishMatch,
    btnText,
    setBtnText,
    activeSummonerId,
    setActiveSummonerId,
  };
};

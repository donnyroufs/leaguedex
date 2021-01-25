import React, { createContext, useContext, useState } from "react";

const championContext = createContext();

export const ChampionsProvider = ({ children }) => {
  const champions = useChampionProvider();
  return (
    <championContext.Provider value={champions} displayName="Champions">
      {children}
    </championContext.Provider>
  );
};

export const useChampions = () => {
  return useContext(championContext);
};

const useChampionProvider = () => {
  const [champions, setChampions] = useState([]);
  const [championA, setChampionA] = useState(null);

  // After updating notifications we need to update our current champions
  async function afterUpdateNotifications(data) {
    const updatedChampions = champions.map((champion) => {
      if (data.includes(champion.id) && !champion.has_matchups) {
        return {
          ...champion,
          has_matchups: true,
        };
      }
      return champion;
    });

    setChampions(updatedChampions);
  }

  return {
    champions,
    setChampions,
    afterUpdateNotifications,
    setChampionA,
    championA,
  };
};

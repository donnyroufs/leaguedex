import React, { useRef, useEffect } from "react";
import Select from "../select/Select";
import useLocalStorage from "react-use-localstorage";
import { useCallback } from "react";

const SummonerDropdown = ({ summoners }) => {
  const initialLoad = useRef(true);
  const [activeSummonerId, setActiveSummonerId] = useLocalStorage(
    "LEAGUEDEX_ACTIVE_SUMMONER",
    null
  );

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    const summonerExists = summoners.find(
      (s) => s.accountId === activeSummonerId
    );

    if (!summonerExists) {
      setActiveSummonerId(summoners[0].accountId);
    }
  }, [activeSummonerId, summoners, setActiveSummonerId]);

  const handleChange = useCallback(
    (e) => {
      e.persist();
      setActiveSummonerId(e.target.value);
    },
    [setActiveSummonerId]
  );

  const options = summoners.map((summoner) => ({
    value: summoner.accountId,
    label: summoner.name,
  }));

  return (
    <Select
      value={activeSummonerId}
      onChange={handleChange}
      options={options}
    />
  );
};

export default SummonerDropdown;

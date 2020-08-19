import React, { useEffect, useState } from "react";
import Champion from "./Champion";
import { getToken } from "../../helpers/getToken";

const fetchMatchups = async (name) => {
  const res = await fetch(`/api/matchup/all?champion=${name}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });
  const data = await res.json();
  return { data, res };
};

const ChampionContainer = ({
  match: {
    params: { name },
  },
}) => {
  const [loading, setLoading] = useState(true);
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchMatchups(name);
        setMatchups(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, [name]);

  return <Champion loading={loading} matchups={matchups} />;
};

export default ChampionContainer;

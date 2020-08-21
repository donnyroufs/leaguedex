import React, { useEffect, useState } from "react";
import Champion from "./Champion";
import { getToken } from "../../helpers/getToken";

const fetchMatchups = async (name, params = "") => {
  const res = await fetch(`/api/matchup/all?champion=${name}${params}`, {
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

const createQuery = ({ lane, championB }) => {
  let query = "";

  if (championB.length > 1) {
    query += `&championB=${championB}`;
  }

  if (lane !== "All") {
    query += `&lane=${lane}`;
  }

  return query;
};

const ChampionContainer = ({
  match: {
    params: { name },
  },
}) => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    championB: "",
    lane: "All",
  });
  const [matchups, setMatchups] = useState([]);
  const [championA, setChampionA] = useState({});

  const onSearch = (e) => {
    e.preventDefault();
    const query = createQuery(values);
    fetchMatchups(name, query)
      .then(({ data }) => setMatchups(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchMatchups(name);
        setMatchups(data);
        setChampionA(data[0].championA);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    })();
  }, [name]);

  return (
    <Champion
      loading={loading}
      matchups={matchups}
      name={name}
      setValues={setValues}
      values={values}
      onSearch={onSearch}
      championA={championA}
    />
  );
};

export default ChampionContainer;

import React, { useEffect, useState } from "react";
import Champion from "./Champion";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";
import { getToken } from "../../helpers/getToken";
import { loadImage } from "../../helpers/loadImages";
import Helmet from "react-helmet";

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
        await loadImage(data[0].championA.splash);
        setMatchups(data);
        setChampionA(data[0].championA);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    })();
  }, [name]);

  if (loading) {
    return (
      <Loader.Container hide={!loading} secondary>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Leaguedex - Champions</title>
      </Helmet>
      <Champion
        matchups={matchups}
        name={name}
        setValues={setValues}
        values={values}
        onSearch={onSearch}
        championA={championA}
      />
    </>
  );
};

export default ChampionContainer;

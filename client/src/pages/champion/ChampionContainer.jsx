import React, { useEffect, useState, useMemo, useRef } from "react";
import Champion from "./Champion";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";
import { loadImage } from "../../helpers/loadImages";
import { Helmet } from "react-helmet-async";
import { useDebounce } from "use-debounce";
import { useChampions } from "../../hooks/useChampions";
import makeRequest from "../../helpers/makeRequest";

const nameCapitalized = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const fetchMatchups = async (payload) => {
  const query = createQuery(payload);
  const res = await makeRequest(`/api/matchup/all?${query}`);
  const data = await res.json();
  return { data, res };
};

const createQuery = ({ name, championB }) => {
  const params = new URLSearchParams({
    champion: name,
  });

  if (championB) {
    params.set("championB", nameCapitalized(championB));
  }

  return params;
};

const ChampionContainer = ({
  match: {
    params: { name },
  },
  history,
}) => {
  const [loading, setLoading] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [matchups, setMatchups] = useState([]);
  const { championA, setChampionA } = useChampions();
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 300);
  const initialLoad = useRef(true);

  const columns = useMemo(
    () => [
      {
        Header: "opponent",
        accessor: "opponent",
      },
      {
        Header: "lane",
        accessor: "lane",
      },
      {
        Header: "games played",
        accessor: "games_played",
      },
      {
        Header: "wins",
        accessor: "games_won",
      },
      {
        Header: "lost",
        accessor: "games_lost",
      },
      {
        Header: "win ratio",
        accessor: "win_ratio",
      },
      {
        Header: "privacy",
        accessor: "private",
      },
    ],
    []
  );

  const handleNavigate = (id) => {
    history.push(`/dex/${id}`);
  };

  useEffect(() => {
    if (initialLoad.current) {
      return;
    }
    fetchMatchups({ name, championB: debouncedValue })
      .then(({ data }) => setMatchups(data))
      .catch((err) => console.error(err));
  }, [debouncedValue, name]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchMatchups({ name });
        await loadImage(data[0].championA.splash);
        setMatchups(data[0].championB ? data : []);
        setChampionA(data[0].championA);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
      initialLoad.current = false;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, privacy]);

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
        columns={columns}
        matchups={matchups}
        name={name}
        value={value}
        setValue={setValue}
        championA={championA}
        handleNavigate={handleNavigate}
        privacy={privacy}
        setPrivacy={setPrivacy}
      />
    </>
  );
};

export default ChampionContainer;

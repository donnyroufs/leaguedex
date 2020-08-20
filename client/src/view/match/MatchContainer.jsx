import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Match from "./Match";
import { useMatch } from "../../hooks/useMatch";
import { getToken } from "../../helpers/getToken";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";

const fetchLatest = async (id) => {
  const res = await fetch(`/api/matchup/latest/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });
  return res.json();
};

const MatchContainer = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const { id } = useParams();
  const { createMatchup, match, findMatch, hasMatch } = useMatch();

  const selectChampion = ({ id, name }) => {
    setSelected(id);
  };

  const selectRole = async (role) => {
    const dexId = await createMatchup(selected, role);
    history.push(`/dex/${dexId}`);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (id) {
        try {
          const data = await fetchLatest(id);
          if (data.confirmed) {
            history.push(`/dex/${data.id}`);
          }

          if (data.updated) {
            await findMatch();
            if (hasMatch) {
              history.push(`/match/${match.gameId}`);
            } else {
              history.push("/");
            }
          }
        } catch (err) {
          return null;
        }
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <Loader.Container hide={!loading && "true"} secondary>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  return (
    <Match
      match={match}
      selected={selected}
      selectChampion={selectChampion}
      selectRole={selectRole}
    />
  );
};

export default MatchContainer;

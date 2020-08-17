import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Match from "./Match";
import { useMatch } from "../../hooks/useMatch";
import { getToken } from "../../helpers/getToken";

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
// const fetchDex = async (id) => {
//   const res = await fetch(`/api/matchup/${id}`, {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: getToken(),
//     },
//     credentials: "include",
//   });
//   return res.json();
// };

const MatchContainer = ({ history }) => {
  const [selected, setSelected] = useState(null);
  const { id } = useParams();
  const { createMatchup } = useMatch();

  const selectChampion = ({ id, name }) => {
    setSelected(id);
  };

  const selectRole = async (role) => {
    const dexId = await createMatchup(selected, role);
    history.push(`/dex/${dexId}`);
  };

  useEffect(() => {
    console.log(id);
    (async () => {
      if (id) {
        try {
          const data = await fetchLatest(id);
          if (data.confirmed) {
            history.push(`/dex/${data.id}`);
          }
        } catch (err) {
          return null;
        }
      }
    })();
  }, [id]);

  return (
    <Match
      match={history.location.state}
      selected={selected}
      selectChampion={selectChampion}
      selectRole={selectRole}
    />
  );
};

export default MatchContainer;

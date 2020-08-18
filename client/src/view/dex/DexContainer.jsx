import React from "react";
import { useParams } from "react-router";
import Dex from "./Dex";
import { getToken } from "../../helpers/getToken";
import { useMatch } from "../../hooks/useMatch";

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

const DexContainer = ({ history }) => {
  const { setMatch, match } = useMatch();

  const finishMatch = (e) => {
    e.preventDefault();
    (async () => {
      if (match.gameId) {
        try {
          const data = await fetchLatest(match.gameId);
          if (data.updated) {
            history.push("/");
            setMatch(null);
          }
        } catch (err) {
          return null;
        }
      }
    })();
  };

  return <Dex finishMatch={finishMatch} />;
};

export default DexContainer;

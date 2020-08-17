import React, { useState, useEffect } from "react";
import { Container } from "./Dex.styles";
import { useParams } from "react-router";
import { getToken } from "../../helpers/getToken";

const fetchDex = async (id) => {
  const res = await fetch(`/api/matchup/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });
  return res.json();
};

const Dex = () => {
  const [loading, setLoading] = useState(true);
  const [dex, setDex] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        setLoading(true);
        const data = await fetchDex(id);
        setDex(data);
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return "loading...";
  }

  return (
    <Container>
      <p>played games: {dex.games_played}</p>
    </Container>
  );
};

export default Dex;

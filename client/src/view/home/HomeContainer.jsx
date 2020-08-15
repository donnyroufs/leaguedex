import React, { useState } from "react";
import Home from "./Home";
import { useAuth } from "../../hooks/useAuth";
import { getToken } from "../../helpers/getToken";
import { MoonLoader } from "react-spinners";

const fetchChampions = async (isAuthenticated) => {
  const endpoint = isAuthenticated ? "/api/matchup/played" : "/api/champion";
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });
  return response.json();
};

const HomeContainer = () => {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    fetchChampions(isAuthenticated).then((data) => {
      setChampions(data);
      setLoading(false);
    });
  }, [isAuthenticated]);

  return loading ? (
    <MoonLoader color="B8D0EC" />
  ) : (
    <Home champions={champions} loading={loading} />
  );
};

export default HomeContainer;

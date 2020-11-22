import React, { useState, useEffect } from "react";
import Home from "./Home";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";
import { loadAssets, build } from "../../helpers/loadImages";
import { Helmet } from "react-helmet-async";
import makeRequest from "../../helpers/makeRequest";

const fetchChampions = async (isAuthenticated) => {
  const endpoint = isAuthenticated ? "/api/matchup/played" : "/api/champion";
  const response = await makeRequest(endpoint);
  return response.json();
};

const fetchInfoCard = async () => {
  const response = await makeRequest(`/api/matchup/info`);
  return response.json();
};

const HomeContainer = (props) => {
  const { setModal } = useModal();
  const [champions, setChampions] = useState([]);
  const [info, setInfo] = useState({
    count: 0,
    gamesPlayed: 0,
  });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const _champions = await fetchChampions(isAuthenticated);
        setChampions(_champions);

        const assets = build(_champions, 12);
        await loadAssets(assets);

        if (isAuthenticated) {
          const _info = await fetchInfoCard();
          setInfo(_info);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const action = params.get("action");

    if (action === "reset_password") {
      setModal("resetPassword");
    }
  }, [props.location.search, setModal]);

  if (loading) {
    return (
      <Loader.Container hide={!loading && "true"}>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Leaguedex</title>
      </Helmet>
      <Home
        champions={champions}
        info={info}
        loading={loading}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};

export default HomeContainer;

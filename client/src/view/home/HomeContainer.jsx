import React, { useState } from "react";
import Home from "./Home";
import { useAuth } from "../../hooks/useAuth";
import { getToken } from "../../helpers/getToken";
import * as Loader from "../../components/styles/Loader";
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

const fetchInfoCard = async () => {
  const response = await fetch("/api/matchup/info", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });

  return response.json();
};

function loadImages(images) {
  return images.map((imageFile) => {
    return new Promise((resolve) => {
      const image = new Image();

      image.onload = () => {
        resolve(image);
      };

      image.src = imageFile;
    });
  });
}

const HomeContainer = () => {
  const [champions, setChampions] = useState([]);
  const [info, setInfo] = useState({
    count: 0,
    gamesPlayed: 0,
  });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const _champions = await fetchChampions(isAuthenticated);
        setChampions(_champions);
        const assets = _champions
          .map((champ, index) => (index < 12 ? champ.image : null))
          .filter((img) => img);

        await Promise.all(loadImages(assets));

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

  if (loading) {
    return (
      <Loader.Container hide={!loading && "true"}>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  return <Home champions={champions} info={info} loading={loading} />;
};

export default HomeContainer;

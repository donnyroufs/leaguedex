import React, { useEffect, useState, useMemo } from "react";
import { useManyInputs } from "../../hooks/useInput";
import RowsLayout from "../../components/rowsLayout/RowsLayout";
import ProfileMatchupsHeader from "./ProfileMatchupsHeader";
import { API } from "../../api/index";
import ProfileMatchupsBody from "./ProfileMatchupsBody";
import makeRequest from "../../helpers/makeRequest";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";

// TODO: Move to api
const fetchPublicMatchups = async (username, championName) => {
  const res = await makeRequest(
    `/api/shared/matchups/?username=${username}&profile="true"&championName=${championName}`
  );
  return res.json();
};

// TODO: Add matchup likes
const ProfileMatchups = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const [champion, setChampion] = useState(null);
  const { value, handleChange } = useManyInputs({
    search: "",
  });
  const [matchups, setMatchups] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "champion",
        accessor: "champion",
      },
      {
        Header: "opponent",
        accessor: "versus",
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
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    fetchPublicMatchups(match.params.username, match.params.champion)
      .then((data) => {
        setMatchups(data);
        setLoading(false);
      })
      .catch((_) => {
        setMatchups([]);
        setLoading(false);
      });
  }, [match.params.username, match.params.champion]);

  useEffect(() => {
    API.getChampionByName(match.params.champion).then((data) => {
      setChampion(data);
    });
  }, [match.params.champion]);

  const handleNavigate = (id) => {
    history.push(`/profile/${match.params.username}/dex/${id}`);
  };

  if (loading || !champion) {
    return (
      <Loader.Container hide={!loading} secondary>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  const filteredData = matchups.filter((m) =>
    m.championB.name.toLowerCase().includes(value.search.toLowerCase())
  );

  return (
    <RowsLayout
      header={
        <ProfileMatchupsHeader
          value={value}
          handleChange={handleChange}
          champion={champion}
          username={match.params.username}
        />
      }
      body={
        <ProfileMatchupsBody
          data={filteredData}
          columns={columns}
          handleNavigate={handleNavigate}
        />
      }
    />
  );
};

export default ProfileMatchups;

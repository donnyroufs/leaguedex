import React, { useState, useEffect, useMemo } from "react";
import Profile from "./Profile";
import { Helmet } from "react-helmet-async";
import makeRequest from "../../helpers/makeRequest";

const fetchPublicMatchups = async (username) => {
  const res = await makeRequest(
    `/api/shared?username=${username}&profile="true"`
  );
  return res.json();
};

const ProfileContainer = ({ history, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchPublicMatchups(props.match.params.username)
      .then((data) => {
        setMatchups(data);
        setLoading(false);
      })
      .catch((err) => {
        setMatchups([]);
        setLoading(false);
      });
  }, [props.match.params.username]);

  const columns = useMemo(
    () => [
      {
        Header: "champion",
        accessor: "champion",
      },
      {
        Header: "versus",
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

  const handleNavigate = (id) => {
    history.push(`/dex/${id}`);
    history.push(`/profile/${props.match.params.username}/dex/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>Leaguedex - {props.match.params.username}'s profile</title>
      </Helmet>
      <Profile
        {...props}
        matchups={matchups}
        loading={loading}
        columns={columns}
        handleNavigate={handleNavigate}
        username={props.match.params.username}
      />
      ;
    </>
  );
};

export default ProfileContainer;

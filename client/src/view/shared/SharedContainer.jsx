import React, { useState, useEffect } from "react";
import Shared from "./Shared";
import Helmet from "react-helmet";
import makeRequest from "../../helpers/makeRequest";

const fetchPublicMatchups = async (username) => {
  const res = await makeRequest(`/api/shared?username=${username}`)
  return res.json();
};

const SharedContainer = (props) => {
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
  return (
    <>
      <Helmet>
        <title>Leaguedex - {props.match.params.username}'s profile</title>
      </Helmet>
      <Shared {...props} matchups={matchups} loading={loading} />;
    </>
  );
};

export default SharedContainer;

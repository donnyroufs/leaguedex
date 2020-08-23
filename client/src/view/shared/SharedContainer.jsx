import React, { useState, useEffect } from "react";
import Shared from "./Shared";

const fetchPublicMatchups = async (username) => {
  const res = await fetch(`/api/shared?username=${username}`);
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
  return <Shared {...props} matchups={matchups} loading={loading} />;
};

export default SharedContainer;

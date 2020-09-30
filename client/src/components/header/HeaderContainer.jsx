import React from "react";
import Header from "./Header";

import { useHistory } from "react-router";
import { getToken } from "../../helpers/getToken";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import { useMatch } from "../../hooks/useMatch";
import { toast } from "react-toastify";

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

const finishMatch = async (match) => {
  try {
    const data = await fetchLatest(match.gameId);
    return data;
  } catch (err) {
    return null;
  }
};

const HeaderContainer = (props) => {
  const history = useHistory();
  const { isAuthenticated, logout, hasSummoner, user } = useAuth();
  const { setModal } = useModal();
  const { setMatch, findMatch, match, setLoading } = useMatch();

  const handleFindMatch = async (e) => {
    e.preventDefault();
    const _match = await findMatch();
    if (_match) {
      history.push(`/match/${_match.gameId}`);
    }
  };

  const handleMatchupSelection = (e) => {
    e.preventDefault();
    history.push(`/match/${match.gameId}`);
  };

  const handleLiveMatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { confirmed, updated, id } = await finishMatch(match);
    setLoading(false);

    if (!confirmed || (confirmed && !updated)) {
      history.push(`/dex/${id}`);
    }

    if (confirmed && updated) {
      const _match = await findMatch();
      toast.info("Match updated.");
      if (_match) {
        history.push(`/match/${_match.gameId}`);
      } else {
        history.push(`/`);
        setMatch(null);
      }
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setMatch(null);
    logout();
  };

  return (
    <Header
      {...props}
      isAuthenticated={isAuthenticated}
      setModal={setModal}
      handleLogout={handleLogout}
      hasSummoner={hasSummoner}
      user={user}
      handleFindMatch={handleFindMatch}
      handleLiveMatch={handleLiveMatch}
      handleMatchupSelection={handleMatchupSelection}
    />
  );
};

export default HeaderContainer;

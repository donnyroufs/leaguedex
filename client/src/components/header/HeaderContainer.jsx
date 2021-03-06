import React from "react";
import Header from "./Header";

import { useHistory } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import { useMatch } from "../../hooks/useMatch";
import { toast } from "react-toastify";

const HeaderContainer = (props) => {
  const history = useHistory();
  const { isAuthenticated, logout, hasSummoner, user, isAdmin } = useAuth();
  const { setModal } = useModal();
  const {
    setMatch,
    findMatch,
    match,
    setLoading,
    revertMatch,
    finishMatch,
  } = useMatch();

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
      toast.info("Match is done, updated stats.");
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
      isAdmin={isAdmin}
      revertMatch={revertMatch}
    />
  );
};

export default HeaderContainer;

import React from "react";
import Header from "./Header";

import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import { useMatch } from "../../hooks/useMatch";

const HeaderContainer = (props) => {
  const { isAuthenticated, logout, hasSummoner } = useAuth();
  const { setModal } = useModal();
  const { setMatch } = useMatch();

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
    />
  );
};

export default HeaderContainer;

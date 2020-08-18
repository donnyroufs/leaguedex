import React, { useEffect } from "react";
import { useMatch } from "../../hooks/useMatch";
import Header from "./Header";
import { useAuth } from "../../hooks/useAuth";

const HeaderContainer = () => {
  const { isAuthenticated } = useAuth();
  const { hasMatch, findMatch } = useMatch();

  useEffect(() => {
    if (!hasMatch && isAuthenticated) {
      findMatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMatch, isAuthenticated]);

  return <Header />;
};

export default HeaderContainer;

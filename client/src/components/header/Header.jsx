import React from "react";
import { useHistory } from "react-router";
import { Container } from "./Header.styles";
import { Button, Link } from "../../GlobalStyles";
import { useModal } from "../../hooks/useModal";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../hooks/useAuth";
import { useMatch } from "../../hooks/useMatch";

const Header = () => {
  const history = useHistory();
  const modal = useModal();
  const { logout, isAuthenticated, user, isAllowed } = useAuth();
  const { findMatch, hasMatch, loading, match, setMatch } = useMatch();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setMatch(null);
    history.push("/");
  };

  const handleFindMatch = async (e) => {
    e.preventDefault();
    await findMatch();
    if (hasMatch) {
      history.push(`/match/${match.gameId}`);
    }
  };

  return (
    <Container>
      <Container.Brand to="/">
        <Container.Brand.Image src="/logo.svg" alt="leaguedex logo" />
      </Container.Brand>
      {user && (
        <Container.Account>
          {user.permissions < 10 && (
            <Container.Name to="/">{user.username}</Container.Name>
          )}
          {isAllowed(10) && (
            <Container.Name to="/admin/dashboard">
              {user.username}
            </Container.Name>
          )}
        </Container.Account>
      )}
      <Container.Buttons authenticated={isAuthenticated}>
        {!isAuthenticated && (
          <>
            <Button onClick={() => modal.setModal("register")}>Register</Button>
            <Button secondary header onClick={() => modal.setModal("login")}>
              Login
            </Button>
          </>
        )}
        {isAuthenticated && (
          <>
            {!user.summoner && (
              <Button onClick={() => modal.setModal("summoner")}>
                Add Summoner Account
              </Button>
            )}
            {user.summoner && !hasMatch && (
              <Button header onClick={handleFindMatch} disabled={loading}>
                {loading && <BeatLoader color="#B8D0EC" />}
                {!loading && "You are not in a match"}
              </Button>
            )}
            {user.summoner && hasMatch && (
              <Link
                to={{
                  pathname: `/match/${match.gameId}`,
                  state: {
                    ...match,
                  },
                }}
              >
                You are in a match
              </Link>
            )}
            <Button header onClick={handleLogout}>
              Log out
            </Button>
          </>
        )}
      </Container.Buttons>
    </Container>
  );
};

export default Header;

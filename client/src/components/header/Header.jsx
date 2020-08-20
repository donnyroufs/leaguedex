import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Container } from "./Header.styles";
import { Button, Link } from "../../GlobalStyles";
import { useModal } from "../../hooks/useModal";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../hooks/useAuth";
import { useMatch } from "../../hooks/useMatch";

const AVERAGE_GAMELENGTH = 35;

function formatTime(startTime) {
  const minutes = Math.floor(startTime / 60000);
  const seconds = ((startTime % 60000) / 1000).toFixed(0);
  const formatted = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  return { minutes, formatted };
}

const calculateGameTime = (startTime) => Date.now() - startTime;

const Header = () => {
  const history = useHistory();
  const modal = useModal();
  const { logout, isAuthenticated, user, isAllowed } = useAuth();
  const { findMatch, hasMatch, loading, match, setMatch } = useMatch();
  const [gameTime, setGameTime] = useState(null);
  const [min, setMin] = useState(0);

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

  useEffect(() => {
    if (loading || !hasMatch) return;
    const timer = setInterval(() => {
      const miliseconds = calculateGameTime(match.startTime);
      const { formatted, minutes } = formatTime(miliseconds);
      setMin(minutes);
      setGameTime(formatted);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTime, loading]);

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
                style={{ minWidth: "100px" }}
                aboveAverage={min >= AVERAGE_GAMELENGTH}
                to={{
                  pathname: `/match/${match.gameId}`,
                  state: {
                    ...match,
                  },
                }}
              >
                {gameTime || "0:00"}
              </Link>
            )}
            <Button header logout onClick={handleLogout}>
              Log out
            </Button>
          </>
        )}
      </Container.Buttons>
    </Container>
  );
};

export default Header;

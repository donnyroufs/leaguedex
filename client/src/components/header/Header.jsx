import React from "react";
import { useHistory } from "react-router";
import { Container } from "./Header.styles";
import { Button } from "../../GlobalStyles";
import { useModal } from "../../hooks/useModal";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../hooks/useAuth";
import { useMatch } from "../../hooks/useMatch";
import { getToken } from "../../helpers/getToken";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";

const AVERAGE_GAMELENGTH = 35;

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

const Header = () => {
  const history = useHistory();
  const modal = useModal();
  const { logout, isAuthenticated, user, isAllowed } = useAuth();
  const {
    findMatch,
    hasMatch,
    loading,
    match,
    setMatch,
    confirmed,
    timer,
    minutes,
  } = useMatch();

  const handleLogout = (e) => {
    e.preventDefault();
    setMatch(null);
    logout();
    history.push("/");
  };

  const handleFindMatch = async (e) => {
    e.preventDefault();
    const _match = await findMatch();
    if (_match) {
      history.push(`/match/${_match.gameId}`);
    }
  };

  const handleNavigate = async (e) => {
    e.preventDefault();
    const { confirmed, updated, id } = await finishMatch(match);

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

  return (
    <Container>
      <ReactTooltip />
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
            <Button
              secondary
              onClick={() => modal.setModal("login")}
              style={{ marginLeft: "1.25rem" }}
            >
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

            {user.summoner && (
              <>
                {!hasMatch && (
                  <>
                    {!confirmed && (
                      <Button
                        header
                        onClick={handleFindMatch}
                        disabled={loading}
                        data-tip="Games are detected after loading screen."
                      >
                        {loading && <BeatLoader color="#B8D0EC" />}
                        {!loading && "Find live match"}
                      </Button>
                    )}
                  </>
                )}

                {hasMatch && (
                  <>
                    {!confirmed && (
                      <Button
                        header
                        onClick={() => history.push(`/match/${match.gameId}`)}
                      >
                        You are in a match
                      </Button>
                    )}
                    {confirmed && (
                      <Button
                        header
                        aboveAverage={minutes >= AVERAGE_GAMELENGTH}
                        onClick={handleNavigate}
                      >
                        {timer.split(":")[1] !== "00" ? (
                          timer
                        ) : (
                          <BeatLoader color="#B8D0EC" />
                        )}
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
            <Button
              logout
              onClick={handleLogout}
              style={{ marginLeft: "1.25rem" }}
            >
              Log out
            </Button>
          </>
        )}
      </Container.Buttons>
    </Container>
  );
};

export default Header;

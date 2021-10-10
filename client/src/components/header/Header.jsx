import React from "react";
import StatusBar from "../statusbar/StatusBarContainer";
import { Container, Hamburger, Box } from "./Header.styles";
import { Button } from "../../GlobalStyles";
import SummonerDropdown from "../summonerDropdown/SummonerDropdown";
import { FaBars } from "react-icons/fa";
import { useSidebar } from "../../hooks/useSidebar";
import Notifications from "../notifications/Notifications";
import s from "styled-components";

const Bar = s.div`
	display: flex;
	padding: 1rem;
	align-items: center;
	justify-content: center;
	background: #f87373;
	color: white;
`;

const Header = ({
  isAuthenticated,
  setModal,
  handleLogout,
  hasSummoner,
  user,
  handleFindMatch,
  handleMatchupSelection,
  handleLiveMatch,
  revertMatch,
}) => {
  const { isOpen, handleClick } = useSidebar();

  return (
    <Container isOpen={isOpen}>
      {user && (
        <StatusBar
          isAuthenticated={isAuthenticated}
          hasSummoner={hasSummoner}
          handleFindMatch={handleFindMatch}
          handleLiveMatch={handleLiveMatch}
          handleMatchupSelection={handleMatchupSelection}
          revertMatch={revertMatch}
        />
      )}
      <Bar>
        <div
          style={{
            maxWidth: "1400px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>Leaguedex will be taken down at: 11-1-2021 </Box>
          <a
            href="https://docs.google.com/forms/d/14gPiJI_2qLu_Rs3KScmtOzFhTyNdA8oJdkGIxJHU6Gw/edit"
            style={{ marginLeft: "0.5rem", color: "white", fontWeight: "bold" }}
          >
            sign up to have your data sent to you
          </a>
        </div>
      </Bar>

      <Container.Inner>
        <Container.Bottom>
          <Box flex>
            <Hamburger onClick={handleClick}>
              <FaBars />
            </Hamburger>
            <Container.Brand to="/collection">
              <Container.Brand.Image src="/new_logo.svg" alt="leaguedex logo" />
            </Container.Brand>
          </Box>
          <Box>
            <Container.Buttons authenticated={isAuthenticated}>
              {!isAuthenticated && (
                <>
                  <Button onClick={() => setModal("register")}>Register</Button>
                  <Button logout onClick={() => setModal("login")}>
                    Login
                  </Button>
                </>
              )}
              {isAuthenticated && (
                <>
                  {!hasSummoner && (
                    <Button hide-xs onClick={() => setModal("summoner")}>
                      Add Summoner Account
                    </Button>
                  )}

                  {hasSummoner && (
                    <SummonerDropdown summoners={user.summoner} />
                  )}

                  <Button hide-xs logout onClick={handleLogout}>
                    Log out
                  </Button>

                  {hasSummoner && <Notifications />}
                </>
              )}
            </Container.Buttons>
          </Box>
        </Container.Bottom>
      </Container.Inner>
    </Container>
  );
};

export default Header;

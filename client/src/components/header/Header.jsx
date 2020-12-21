import React from "react";
import StatusBar from "../statusbar/StatusBarContainer";
import { Container, Hamburger, Box } from "./Header.styles";
import { Button } from "../../GlobalStyles";
import SummonerDropdown from "../summonerDropdown/SummonerDropdown";
import { FaBars } from "react-icons/fa";
import { useSidebar } from "../../hooks/useSidebar";
import Notification from '../notification/Notification';

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
      <StatusBar
        isAuthenticated={isAuthenticated}
        hasSummoner={hasSummoner}
        handleFindMatch={handleFindMatch}
        handleLiveMatch={handleLiveMatch}
        handleMatchupSelection={handleMatchupSelection}
        revertMatch={revertMatch}
      />
      <Container.Inner>
        <Container.Bottom>
          <Box flex>
            <Hamburger onClick={handleClick}>
              <FaBars />
            </Hamburger>
            <Container.Brand to="/">
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

                  {hasSummoner && <Notification />}
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

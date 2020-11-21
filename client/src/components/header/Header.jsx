import React from "react";
import StatusBar from "../statusbar/StatusBarContainer";

import { Container, LinkIcon, Links, Hamburger } from "./Header.styles";
import { Button } from "../../GlobalStyles";
import SummonerDropdown from "../summonerDropdown/SummonerDropdown";
import {
  FaQuestionCircle,
  FaUser,
  FaTachometerAlt,
  FaTwitter,
  FaCog,
  FaBars,
} from "react-icons/fa";

const Header = ({
  isAuthenticated,
  setModal,
  handleLogout,
  hasSummoner,
  user,
  handleFindMatch,
  handleMatchupSelection,
  handleLiveMatch,
  isAdmin,
  revertMatch,
}) => {
  return (
    <Container>
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
          <Container.Brand to="/">
            <Container.Brand.Image src="new_logo.svg" alt="leaguedex logo" />
          </Container.Brand>
          <Container.Buttons authenticated={isAuthenticated}>
            {/* <Links>
              <LinkIcon to="/about">
                <FaQuestionCircle fontSize="1.5rem" />
              </LinkIcon>
              <LinkIcon.External
                href="https://twitter.com/league_dex"
                target="_blank"
              >
                <FaTwitter fontSize="1.5rem" />
              </LinkIcon.External>
              {isAuthenticated && (
                <>
                  <LinkIcon to="/settings">
                    <FaCog fontSize="1.5rem" />
                  </LinkIcon>
                  {isAdmin && (
                    <LinkIcon to={`/admin/dashboard`}>
                      <FaTachometerAlt fontSize="1.5rem" />
                    </LinkIcon>
                  )}
                  <LinkIcon to={`/profile/${user.username}`}>
                    <FaUser fontSize="1.5rem" />
                  </LinkIcon>
                </>
              )}
            </Links> */}
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

                {hasSummoner && <SummonerDropdown summoners={user.summoner} />}

                <Button hide-xs logout onClick={handleLogout}>
                  Log out
                </Button>
              </>
            )}
            <Hamburger>
              <FaBars />
            </Hamburger>
          </Container.Buttons>
        </Container.Bottom>
      </Container.Inner>
    </Container>
  );
};

export default Header;

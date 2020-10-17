import React from "react";
import StatusBar from "../statusbar/StatusBarContainer";

import { Container, LinkIcon, Links } from "./Header.styles";
import { Button } from "../../GlobalStyles";
import { FaQuestionCircle, FaUser, FaTachometerAlt } from "react-icons/fa";

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
            <Container.Brand.Image src="/logo.svg" alt="leaguedex logo" />
          </Container.Brand>
          <Container.Buttons authenticated={isAuthenticated}>
            <Links>
              <LinkIcon to="/about">
                <FaQuestionCircle fontSize="1.5rem" />
              </LinkIcon>
              {isAuthenticated && (
                <>
                  {/* <LinkIcon to="/settings">
                    <FaCog fontSize="1.5rem" />
                  </LinkIcon> */}
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
            </Links>
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

                <Button hide-xs logout onClick={handleLogout}>
                  Log out
                </Button>
              </>
            )}
          </Container.Buttons>
        </Container.Bottom>
      </Container.Inner>
    </Container>
  );
};

export default Header;

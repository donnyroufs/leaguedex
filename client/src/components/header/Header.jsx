import React from "react";
import StatusBar from "../statusbar/StatusBarContainer";

import { Container } from "./Header.styles";
import { Button } from "../../GlobalStyles";

const Header = ({ isAuthenticated, setModal, handleLogout, hasSummoner }) => {
  return (
    <Container>
      <StatusBar />
      <Container.Inner>
        <Container.Bottom>
          <Container.Brand to="/">
            <Container.Brand.Image src="/logo.svg" alt="leaguedex logo" />
          </Container.Brand>
          <Container.Buttons authenticated={isAuthenticated}>
            {!isAuthenticated && (
              <>
                <Button onClick={() => setModal("register")}>Register</Button>
                <Button secondary onClick={() => setModal("login")}>
                  Login
                </Button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Button logout onClick={handleLogout}>
                  Log out
                </Button>

                {!hasSummoner && (
                  <Button onClick={() => setModal("summoner")}>
                    Add Summoner Account
                  </Button>
                )}
              </>
            )}
          </Container.Buttons>
        </Container.Bottom>
      </Container.Inner>
    </Container>
  );
};

export default Header;

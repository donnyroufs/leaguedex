import React from "react";
import { Container } from "./Menu.styles";
import { Button, Link } from "../../GlobalStyles";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";

const Menu = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const { setModal, isOpen } = useModal();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <Container
      isOpen={isOpen("register") || isOpen("login") || isOpen("summoner")}
    >
      <Container.Buttons>
        {!isAuthenticated && (
          <>
            <Button menu onClick={() => setModal("register")}>
              Register
            </Button>
            <Button secondary menu onClick={() => setModal("login")}>
              Login
            </Button>
          </>
        )}
        {isAuthenticated && (
          <>
            {!user.summoner && (
              <Button menu="true" onClick={() => setModal("summoner")}>
                Add Account
              </Button>
            )}
            {user.summoner && (
              <Link to="/match" menu="true">
                You are not in a match
              </Link>
            )}
            <Button menu="true" onClick={handleLogout}>
              Log out
            </Button>
          </>
        )}
      </Container.Buttons>
    </Container>
  );
};

export default Menu;

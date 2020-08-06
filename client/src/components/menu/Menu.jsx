import React from "react";
import { Container } from "./Menu.styles";
import { Button, Link } from "../../GlobalStyles";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";

const Menu = () => {
  const { logout, isAuthenticated } = useAuth();
  const { setModal } = useModal();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <Container>
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
            {/* <Link to="/match" menu="true">
              You are not in a match
            </Link> */}
            <Button menu="true" onClick={() => setModal("summoner")}>
              Add Account
            </Button>
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

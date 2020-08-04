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
            <Button menu>Register</Button>
            <Button secondary menu onClick={() => setModal("login")}>
              Login
            </Button>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link menu>You are not in a match</Link>
            <Button menu onClick={handleLogout}>
              Log out
            </Button>
          </>
        )}
      </Container.Buttons>
    </Container>
  );
};

export default Menu;

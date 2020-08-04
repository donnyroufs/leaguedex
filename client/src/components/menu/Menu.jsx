import React from "react";
import { Container } from "./Menu.styles";
import { Button, Link } from "../../GlobalStyles";
import { useAuth } from "../../hooks/useAuth";

const Menu = () => {
  const auth = useAuth();

  return (
    <Container>
      <Container.Buttons>
        {!auth.user && (
          <>
            <Button menu>Register</Button>
            <Button secondary menu>
              Login
            </Button>
          </>
        )}
        {auth.user && (
          <>
            <Link menu>You are not in a match</Link>
            <Button menu>Log out</Button>
          </>
        )}
      </Container.Buttons>
    </Container>
  );
};

export default Menu;

import React from "react";
import { Container } from "./Header.styles";
import { Button, Link } from "../../GlobalStyles";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const auth = useAuth();
  return (
    <Container>
      <Container.Brand to="/">
        <Container.Brand.Image src="/logo.svg" alt="leaguedex logo" />
      </Container.Brand>
      <Container.Buttons authenticated={auth.user}>
        {!auth.user && (
          <>
            <Button>Register</Button>
            <Button secondary>Login</Button>
          </>
        )}
        {auth.user && (
          <>
            <Link>You are not in a match</Link>
            <Button>Log out</Button>
          </>
        )}
      </Container.Buttons>
    </Container>
  );
};

export default Header;

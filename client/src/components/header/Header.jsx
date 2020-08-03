import React from "react";
import { Container } from "./Header.styles";
import { Button } from "../../GlobalStyles";

const Header = () => {
  return (
    <Container>
      <Container.Brand to="/">
        <Container.Brand.Image src="/logo.svg" alt="leaguedex logo" />
      </Container.Brand>
      <Container.Buttons>
        <Button to="register">Register</Button>
        <Button to="/login" secondary>
          Login
        </Button>
      </Container.Buttons>
    </Container>
  );
};

export default Header;

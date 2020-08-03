import React from "react";
import { Container } from "./Menu.styles";
import { Button } from "../../GlobalStyles";

const Menu = () => {
  return (
    <Container>
      <Container.Buttons>
        <Button to="register" menu>
          Register
        </Button>
        <Button to="/login" secondary menu>
          Login
        </Button>
      </Container.Buttons>
    </Container>
  );
};

export default Menu;

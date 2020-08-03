import React from "react";
import { Container } from "./Header.styles";

const Header = () => {
  return (
    <Container>
      <Container.Brand to="/">
        <Container.Brand.Image src="logo.svg" alt="leaguedex logo" />
      </Container.Brand>
    </Container>
  );
};

export default Header;

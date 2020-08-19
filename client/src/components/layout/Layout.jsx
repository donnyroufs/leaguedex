import React from "react";
import { Container, Wrapper } from "./Layout.styles";
import Header from "../header/HeaderContainer";
import Menu from "../menu/Menu";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Wrapper>{children}</Wrapper>
      <Menu />
    </Container>
  );
};

export default Layout;

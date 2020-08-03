import React from "react";
import { Container } from "./Layout.styles";
import Header from "../header/HeaderContainer";
import Menu from "../menu/Menu";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
      <Menu />
    </Container>
  );
};

export default Layout;

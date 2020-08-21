import React from "react";
import { Container, Wrapper } from "./Layout.styles";
import Header from "../header/HeaderContainer";
import Menu from "../menu/Menu";
import { isMobile } from "react-device-detect";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Wrapper>{children}</Wrapper>
      {isMobile && <Menu />}
    </Container>
  );
};

export default Layout;

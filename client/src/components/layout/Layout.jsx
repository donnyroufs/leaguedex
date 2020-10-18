import React from "react";
import { Container, Wrapper } from "./Layout.styles";
import Header from "../header/HeaderContainer";
import Menu from "../menu/Menu";
import { HelmetProvider } from "react-helmet-async";
import { isMobile } from "react-device-detect";

const Layout = ({ children }) => {
  return (
    <HelmetProvider>
      <Container>
        <Header />
        <Wrapper>{children}</Wrapper>
        {isMobile && <Menu />}
      </Container>
    </HelmetProvider>
  );
};

export default Layout;

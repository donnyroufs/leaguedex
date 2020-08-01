import React from "react";
import { Container } from "./Layout.styles";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;

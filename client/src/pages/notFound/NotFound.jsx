import React from "react";
import { Container } from "./NotFound.styles";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <Container>
      <Helmet>
        <title>Leaguedex - Not Found.</title>
      </Helmet>
      <p>Sorry couldn't find the page you were looking for!</p>
    </Container>
  );
};

export default NotFound;

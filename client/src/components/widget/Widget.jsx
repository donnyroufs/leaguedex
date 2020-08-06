import React from "react";
import { Container, Wrapper } from "./Widget.styles";

const Widget = ({ title, children }) => {
  return (
    <Container matchup={title === "Find Matchup"}>
      <Wrapper>
        <Container.Title>{title}</Container.Title>
        <Container.Body>{children}</Container.Body>
      </Wrapper>
    </Container>
  );
};

export default Widget;

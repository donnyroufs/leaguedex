import React from "react";
import { Container } from "./StatusBar.styles";

const StatusBar = (props) => {
  return (
    <Container>
      <Container.Inner>
        <span>This is the current status</span>
        <div>and the actions</div>
      </Container.Inner>
    </Container>
  );
};

export default StatusBar;

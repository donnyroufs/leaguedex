import React from "react";
import { Container } from "./Stats.styles";
import CountUp from "react-countup";

const Stats = ({ label, info }) => {
  return (
    <Container>
      <Container.Label>{label}</Container.Label>
      <Container.Info>
        {typeof info === "number" ? <CountUp end={info} duration={5} /> : info}
        {label === "ratio" && "%"}
      </Container.Info>
    </Container>
  );
};

export default Stats;

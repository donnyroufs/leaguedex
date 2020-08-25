import React from "react";
import { Container } from "./Stats.styles";
import CountUp from "react-countup";

const Stats = ({ label, info }) => {
  return (
    <Container>
      <Container.Label>{label}</Container.Label>
      <Container.Info>
        {typeof info === "number" && label !== "win ratio" && (
          <CountUp end={Number(info)} duration={3} />
        )}

        {label === "win ratio" && (
          <>
            <CountUp end={Number(info)} duration={3} />%
          </>
        )}

        {label === "lane" && info}
      </Container.Info>
    </Container>
  );
};

export default Stats;

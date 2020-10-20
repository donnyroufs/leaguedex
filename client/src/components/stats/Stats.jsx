import React from "react";
import { Container } from "./Stats.styles";
import CountUp from "react-countup";

const Stats = ({ label, info, page, type }) => {
  return (
    <Container home={page === "home"} dex={type === "dex"}>
      <Container.Label home={page === "home"}>{label}</Container.Label>
      <Container.Info home={page === "home"}>
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

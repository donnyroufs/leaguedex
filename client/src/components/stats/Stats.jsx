import React from "react";
import { Container } from "./Stats.styles";
import CountUp from "react-countup";

const Stats = ({ label, info, page }) => {
  return (
    <Container home={page === "home"}>
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
        {page === "home" && info > 0 && (
          <CountUp end={Number(info)} duration={3} />
        )}
      </Container.Info>
    </Container>
  );
};

export default Stats;

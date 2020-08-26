import React from "react";
import { Container } from "./Match.styles";

const Match = ({ match, selectChampion, selected, selectRole }) => {
  const roles = ["top", "jungle", "mid", "adc", "support"];

  if (!match) {
    return <p>Couldn't find information for given match.</p>;
  }

  if (!selected) {
    return (
      <Container>
        {match.opponents.map((opponent) => (
          <Container.Wrapper
            key={opponent.id}
            onClick={() => selectChampion(opponent)}
            selected={selected === opponent.id}
          >
            <Container.Image
              src={opponent.image}
              alt={opponent.id}
              effect="blur"
              height="100%"
              width="100%"
              delayTime={100}
            />
            <Container.Text>{opponent.name}</Container.Text>
          </Container.Wrapper>
        ))}
      </Container>
    );
  }

  if (selected) {
    return (
      <Container>
        {roles.map((role) => (
          <Container.Wrapper
            key={role}
            role="true"
            onClick={() => selectRole(role)}
          >
            <Container.Role>{role}</Container.Role>
          </Container.Wrapper>
        ))}
      </Container>
    );
  }
};

export default Match;

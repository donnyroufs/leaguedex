import React, { useEffect } from "react";
import { Container } from "./Match.styles";

const Match = ({ match, selectChampion, selected, selectRole, setStatus }) => {
  const roles = ["top", "jungle", "mid", "adc", "support"];

  useEffect(() => {
    setStatus(!selected ? "Picking opponent" : "Picking opponents lane");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  if (!match) {
    return <p>Couldn't find information for given match.</p>;
  }

  if (!selected) {
    return (
      <Container>
        <Container.Inner>
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
        </Container.Inner>
      </Container>
    );
  }

  if (selected) {
    return (
      <Container>
        <Container.Inner>
          {roles.map((role) => (
            <Container.Wrapper
              key={role}
              role="true"
              onClick={() => selectRole(role)}
            >
              <Container.Role>{role}</Container.Role>
            </Container.Wrapper>
          ))}
        </Container.Inner>
      </Container>
    );
  }
};

export default Match;

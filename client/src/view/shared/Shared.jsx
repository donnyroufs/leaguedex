import React from "react";
import { Card, Results, Container, Details } from "../champion/Champion.styles";

const Shared = ({ matchups, loading, match }) => {
  if (loading) {
    return "Loading...";
  }

  return (
    <Container>
      <Container.Inner>
        <Results>
          {matchups.length <= 0 && "No public matchups."}
          {matchups.length > 0 &&
            matchups.map((matchup) => (
              <Card
                to={`/profile/${match.params.username}/dex/${matchup.id}`}
                key={matchup.id}
              >
                <Card.Background
                  src={matchup.championB.splash}
                  alt={matchup.championB.name}
                />
                <Card.Image
                  src={matchup.championB.icon}
                  alt={matchup.championB.name}
                />
                <Details name="played">
                  <Details.Title>played</Details.Title>
                  <Details.Text>{matchup.games_played}</Details.Text>
                </Details>
                <Details name="wins">
                  <Details.Title>wins</Details.Title>
                  <Details.Text>{matchup.games_won}</Details.Text>
                </Details>
                <Details name="lane">
                  <Details.Title>lane</Details.Title>
                  <Details.Text>{matchup.lane}</Details.Text>
                </Details>
                <Details name="losses">
                  <Details.Title>losses</Details.Title>
                  <Details.Text>{matchup.games_lost}</Details.Text>
                </Details>
              </Card>
            ))}
        </Results>
      </Container.Inner>
    </Container>
  );
};

export default Shared;

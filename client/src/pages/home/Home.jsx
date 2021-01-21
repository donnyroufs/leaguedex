import React, { useState } from "react";
import Card from "../../components/card/CardContainer";
import { Container, Widget } from "./Home.styles";
import { Group, Input, Label } from "../../components/styles/Form";
import Stats from "../../components/stats/Stats";

const Home = ({ champions, info, isAuthenticated }) => {
  const [value, setValue] = useState("");

  return (
    <Container>
      <Container.Widgets>
        {isAuthenticated && (
          <Widget>
            <Stats label="Matchups" page="home" info={info.count} />
            <Stats label="Total Games" page="home" info={info.gamesPlayed} />
          </Widget>
        )}
        <Widget>
          <Group home champion>
            <Label home>Find Dex</Label>
            <Input
              type="text"
              placeholder="Enter champion name"
              value={value}
              onChange={(e) => setValue(e.target.value.toLowerCase())}
            />
          </Group>
        </Widget>
      </Container.Widgets>
      <Container secondary>
        {champions.length > 0 &&
          champions
            .filter((champ) => champ.name.toLowerCase().includes(value))
            .sort((championA) => (championA.has_matchups ? -1 : 1))
            .map((champion) => (
              <Card key={champion.name} champion={champion} />
            ))}
      </Container>
    </Container>
  );
};

export default Home;

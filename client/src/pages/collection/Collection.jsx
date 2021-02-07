import React, { useState, useRef } from "react";
import { Container, Widget } from "./Collection.styles";
import { Group, Input, Label } from "../../components/styles/Form";
import Stats from "../../components/stats/Stats";
import CardsGrid from "../../components/cardsGrid/CardsGrid";

const Collection = ({ champions, info, isAuthenticated }) => {
  const [value, setValue] = useState("");
  const ref = useRef(null);

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
          <Group home champion onClick={() => ref.current.focus()}>
            <Label home>Find Dex</Label>
            <Input
              ref={ref}
              type="text"
              placeholder="Enter champion name"
              value={value}
              onChange={(e) => setValue(e.target.value.toLowerCase())}
            />
          </Group>
        </Widget>
      </Container.Widgets>
      <CardsGrid
        data={champions}
        filterFn={(champ) => champ.name.toLowerCase().includes(value)}
        sortFn={(a, b) => b.matchups_count - a.matchups_count}
        contentFn={(champion) =>
          champion.matchups_count !== 1
            ? `${champion.matchups_count} matchups`
            : `${champion.matchups_count} matchup`
        }
      />
    </Container>
  );
};

export default Collection;

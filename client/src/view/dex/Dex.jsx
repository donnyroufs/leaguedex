import React, { useState } from "react";
import Stats from "../../components/stats/Stats";
import Toggle from "../../components/toggle/Toggle";
import Runes from "../../components/runes/Runes";
import Notes from "../../components/notes/Notes";
import { useAuth } from "../../hooks/useAuth";
import { Container, Header, Text, Highlight, Status } from "./Dex.styles";

const isUpdated = (a, b, c) => a + b === c;
const getPercentage = (a, b, c) => {
  const updated = isUpdated(a, b, c);
  const d = updated ? c : c - 1;
  return c === 1 && !updated ? 0 : ((a / d) * 100).toFixed(0);
};

const Dex = ({ dex, isLive, shared, notes, createNote, deleteNote }) => {
  const [privacy, setPrivacy] = useState(dex.private);
  const { user } = useAuth();

  return (
    <Container>
      <Container.Left>
        <Header>
          <Header.Left>
            {isLive(dex) && <Status>Live !</Status>}
            <Text>
              {dex.championA.name} <Highlight>vs</Highlight>{" "}
              {dex.championB.name}
            </Text>
          </Header.Left>
          <Header.Right>
            <Toggle {...dex} privacy={privacy} setPrivacy={setPrivacy} />
          </Header.Right>
        </Header>
        <Runes />
      </Container.Left>
      <Container.Right>
        <Header type="stats">
          <Stats label="lane" info={dex.lane} page="home" />
          <Stats
            page="home"
            marginTop="1rem"
            label="win ratio"
            info={getPercentage(
              dex.games_won,
              dex.games_lost,
              dex.games_played
            )}
          />
          <Stats page="home" label="wins" info={dex.games_won} />
          <Stats page="home" label="losses" info={dex.games_lost} />
        </Header>
        <Notes
          {...dex}
          user={user}
          setPrivacy={setPrivacy}
          privacy={privacy}
          notes={notes}
          createNote={createNote}
          shared={shared}
          deleteNote={deleteNote}
        />
      </Container.Right>
    </Container>
  );
};

export default Dex;

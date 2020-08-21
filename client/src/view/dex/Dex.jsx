import React, { useState, useRef } from "react";
import {
  Container,
  Image,
  Header,
  Versus,
  Main,
  Notes,
  Status,
} from "./Dex.styles";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";
import Stats from "../../components/stats/Stats";
import { Form, Group, Label, Input } from "../../components/styles/Form";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { toast } from "react-toastify";
import { useMatch } from "../../hooks/useMatch";

const Dex = ({ createNote, notes, dex, loading }) => {
  const ref = useRef();
  const [value, setValue] = useState("");
  const { match } = useMatch();

  if (loading) {
    return (
      <Loader.Container hide={!loading && "true"} secondary>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  const handleClick = (e) => {
    ref.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length <= 0) {
      return toast.error("Notes can't be empty.");
    }

    if (value.length >= 200) {
      return toast.error("Notes can't be longer than 200 characters.");
    }

    createNote(value);
    setValue("");
  };

  const isUpdated = (a, b, c) => a + b === c;
  const getPercentage = (a, b, c) => {
    const updated = isUpdated(a, b, c);
    const d = updated ? c : c - 1;
    return c === 1 && !updated ? 0 : ((a / d) * 100).toFixed(0);
  };

  return (
    <Container>
      <Container.Left>
        <Image src={dex.championA.image} alt={dex.championA.name} you />
        <Image src={dex.championB.image} alt={dex.championB.name} />
        <Versus>vs</Versus>
        <Status>
          {dex && match && Number(dex.game_id) === match.gameId && "LIVE!"}
        </Status>
      </Container.Left>
      <Container.Right>
        <Container.Right.Inner>
          <Header>
            <Stats label="lane" info={dex.lane} />
            <Stats
              label="ratio"
              info={getPercentage(
                dex.games_won,
                dex.games_lost,
                dex.games_played
              )}
            />
            <Stats label="wins" info={dex.games_won} />
            <Stats label="losses" info={dex.games_lost} />
          </Header>
          <Main>
            <Main.Header>
              <Main.Title>Your notes</Main.Title>
            </Main.Header>
            <Form secondary champion onSubmit={handleSubmit}>
              <Group secondary onClick={handleClick}>
                <Label>Add note</Label>
                <Input
                  type="text"
                  placeholder="Enter note"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  secondary
                  ref={ref}
                />
              </Group>
            </Form>
            <Notes>
              <TransitionGroup>
                {notes.length > 0 &&
                  notes
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((note) => (
                      <CSSTransition
                        timeout={500}
                        classNames="fade-and-slide-in"
                        key={note.id}
                      >
                        <Notes.Note key={note.id}>{note.content}</Notes.Note>
                      </CSSTransition>
                    ))}
              </TransitionGroup>
            </Notes>
          </Main>
        </Container.Right.Inner>
      </Container.Right>
    </Container>
  );
};

export default Dex;

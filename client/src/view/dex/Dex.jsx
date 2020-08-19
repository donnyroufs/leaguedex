import React, { useState, useRef } from "react";
import { Container, Image, Header, Versus, Main, Notes } from "./Dex.styles";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";
import Stats from "../../components/stats/Stats";
import { Form, Group, Label, Input } from "../../components/styles/Form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Dex = ({ finishMatch, createNote, notes, dex, history, loading }) => {
  const ref = useRef();
  const [value, setValue] = useState("");

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
    createNote(value);
    setValue("");
  };

  const getPercentage = (a, b) => (a / b) * 100;

  return (
    <Container>
      <Container.Left>
        <Image src={dex.championA.image} alt={dex.championA.name} you />
        <Image src={dex.championB.image} alt={dex.championB.name} />
        <Versus>vs</Versus>
      </Container.Left>
      <Container.Right>
        <Container.Right.Inner>
          <Header>
            <Stats label="lane" info={dex.lane} />
            <Stats
              label="ratio"
              info={Math.round(
                getPercentage(dex.games_won, dex.games_played)
              ).toFixed(0)}
            />
            <Stats label="wins" info={dex.games_won} />
            <Stats label="losses" info={dex.games_lost} />
          </Header>
          <Main>
            <Main.Header>
              <Main.Title>Your notes</Main.Title>
            </Main.Header>
            <Form secondary onSubmit={handleSubmit}>
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

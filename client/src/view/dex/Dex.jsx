import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Image,
  Header,
  Versus,
  Main,
  Notes,
  Status,
  Tag,
  FilterContainer,
  Remove,
} from "./Dex.styles";
import Stats from "../../components/stats/Stats";
import { Form, Group, Label, Input } from "../../components/styles/Form";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { toast } from "react-toastify";
import { useMatch } from "../../hooks/useMatch";
import { parseTagsV2 } from "../../helpers/parseTags";
import Highlight from "react-highlight-words";
import Toggle from "../../components/toggle/Toggle";
import useClipboard from "react-hook-clipboard";
import { useAuth } from "../../hooks/useAuth";
import { FaLink } from "react-icons/fa";
import { arraysEqual } from "../../helpers/arrayHelpers";

const Dex = ({
  createNote,
  notes,
  dex,
  deleteNote,
  handleRevert = Function,
  shared = false,
}) => {
  const ref = useRef();
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState([]);
  const [toDel, setToDel] = useState(null);
  const [, copyToClipboard] = useClipboard();
  const [link, setLink] = useState(null);
  const [privacy, setPrivacy] = useState(false);
  const { user } = useAuth();
  const { match } = useMatch();

  useEffect(() => {
    if (dex) {
      const _tags = parseTagsV2(notes);
      setTags(_tags);
      setPrivacy(dex.private);
      if (!shared) {
        setLink(`https://leaguedex.com/profile/${user.username}/dex/${dex.id}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dex, notes]);

  const handleClick = (e) => {
    ref.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shared) return;
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

  const onFilter = (e, tag) => {
    e.preventDefault();
    if (query.includes(tag)) {
      const newQuery = query.filter((t) => t !== tag);
      setQuery(newQuery);
    } else {
      setQuery((current) => [...current, tag]);
    }
  };

  const filteredNotes = () => {
    if (query.length === 0) {
      return notes;
    } else if (query.length === 1) {
      return notes.filter((note) => note.tags.includes(query[0]));
    } else {
      return notes.filter((note) => arraysEqual(note.tags.split(","), query));
    }
  };

  const liveMatch = () => dex && match && Number(dex.game_id) === match.gameId;

  return (
    <Container>
      <Container.Left>
        <Image src={dex.championA.image} alt={dex.championA.name} you />
        <Image src={dex.championB.image} alt={dex.championB.name} />
        <Versus>vs</Versus>
        {liveMatch() && <Status>LIVE!</Status>}
      </Container.Left>
      <Container.Right>
        <Container.Right.Inner>
          <Header>
            <Stats label="lane" info={dex.lane} />
            <Stats
              label="win ratio"
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
              <Main.Title>
                {!privacy && !shared && (
                  <FaLink
                    className="clipboard"
                    onClick={() => {
                      copyToClipboard(link);
                      toast.info("copied link to clipboard");
                    }}
                  />
                )}
                {shared ? "Notes" : "Your notes"}
              </Main.Title>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {!shared && (
                  <>
                    {liveMatch() && (
                      <Main.Revert
                        style={{ marginRight: "1rem", cursor: "pointer" }}
                        onClick={handleRevert}
                      >
                        Picked wrong matchup?
                      </Main.Revert>
                    )}
                    <Main.Toggle>
                      <Toggle
                        {...dex}
                        privacy={privacy}
                        setPrivacy={setPrivacy}
                      />
                    </Main.Toggle>
                  </>
                )}
              </div>
            </Main.Header>
            <FilterContainer>
              {tags.length <= 0 && !shared && (
                <p style={{ marginTop: "-1rem" }}>
                  Create custom tags by adding{" "}
                  <mark
                    style={{
                      color: "#3F8BE4",
                      backgroundColor: "transparent",
                      fontWeight: "bold",
                    }}
                  >
                    @
                  </mark>{" "}
                  infront of a keyword!
                </p>
              )}
              {tags.length > 0 &&
                tags.map((tag) => (
                  <Tag
                    key={tag}
                    active={query.includes(tag)}
                    onClick={(e) => onFilter(e, tag)}
                  >
                    {tag}
                  </Tag>
                ))}
            </FilterContainer>
            {!shared && (
              <Form secondary champion tweak onSubmit={handleSubmit}>
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
            )}
            <Notes>
              {shared &&
                notes.length <= 0 &&
                "There are no notes for this matchup."}
              <TransitionGroup>
                {notes.length > 0 &&
                  filteredNotes()
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((note) => (
                      <CSSTransition
                        timeout={500}
                        unmountOnExit
                        classNames="fade"
                        key={note.id}
                      >
                        <Notes.Note
                          key={note.id}
                          onClick={() =>
                            setToDel((prev) =>
                              prev === note.id ? null : note.id
                            )
                          }
                        >
                          <Highlight
                            searchWords={query}
                            highlightClassName="highlightNote"
                            textToHighlight={note.content}
                          />
                          {!shared && (
                            <Remove
                              clicked={toDel === note.id}
                              onClick={(e) => deleteNote(e, toDel)}
                            >
                              &times;
                            </Remove>
                          )}
                        </Notes.Note>
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

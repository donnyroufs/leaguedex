import React, { useState, useEffect, useRef } from "react";
import { parseTagsV2 } from "../../helpers/parseTags";
import useClipboard from "react-hook-clipboard";
import { toast } from "react-toastify";
import { FaLink } from "react-icons/fa";
import { Title, Notes as Container } from "../../view/dex/Dex.styles";
import { List, Item, Filter, Tag, Mark, Text } from "./Notes.styles";
import { Form, Group, Input } from "../../components/styles/Form";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { arraysEqual } from "../../helpers/arrayHelpers";
import Highlight from "react-highlight-words";
import Dropdown from "../dropdown/Dropdown";

const Notes = ({
  privacy,
  setPrivacy,
  shared,
  notes,
  user,
  id: dexId,
  createNote,
  deleteNote,
}) => {
  const [query, setQuery] = useState([]);
  const [show, setShow] = useState(null);
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState(null);
  const [, copyToClipboard] = useClipboard();
  const [value, setValue] = useState("");
  const ref = useRef();

  const handleSetShow = (id) => {
    setShow((curr) => (curr === id ? null : id));
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

  useEffect(() => {
    if (notes) {
      const _tags = parseTagsV2(notes);
      setTags(_tags);
      setPrivacy(privacy);
      if (!shared) {
        setLink(`https://leaguedex.com/profile/${user.username}/dex/${dexId}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  const handleCopy = () => {
    copyToClipboard(link);
    toast.info("copied link to clipboard");
  };

  return (
    <Container>
      <Title>
        {!privacy && !shared && (
          <FaLink className="clipboard" onClick={handleCopy} />
        )}
        {shared ? "Notes" : "Your notes"}
      </Title>

      <Filter>
        {tags.length <= 0 && !shared && (
          <Text>
            Create custom tags by adding <Mark>@</Mark> infront of a keyword!
          </Text>
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
      </Filter>

      {!shared && (
        <Form secondary champion notes onSubmit={handleSubmit}>
          <Group secondary notes onClick={handleClick}>
            <Input
              type="text"
              placeholder="Start typing..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              ref={ref}
            />
          </Group>
        </Form>
      )}

      <List shared={shared}>
        {shared && notes.length <= 0 && "There are no notes for this matchup."}
        <TransitionGroup>
          {notes.length > 0 &&
            filteredNotes()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((note) => (
                <CSSTransition
                  timeout={500}
                  unmountOnExit
                  classNames="fade"
                  key={note.id}
                >
                  <Item key={note.id}>
                    <Highlight
                      searchWords={query}
                      highlightClassName="highlightNote"
                      textToHighlight={note.content}
                    />
                    {!shared && (
                      <Dropdown
                        show={show}
                        handleSetShow={handleSetShow}
                        id={note.id}
                        deleteNote={deleteNote}
                      />
                    )}
                  </Item>
                </CSSTransition>
              ))}
        </TransitionGroup>
      </List>
    </Container>
  );
};

export default Notes;

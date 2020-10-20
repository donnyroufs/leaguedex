import React, { useState, useEffect, useRef } from "react";
import { PoseGroup } from "react-pose";
import { parseTagsV2 } from "../../helpers/parseTags";
import useClipboard from "react-hook-clipboard";
import { toast } from "react-toastify";
import { FaLink } from "react-icons/fa";
import { Title, Notes as Container } from "../../view/dex/Dex.styles";
import { List, Item, Filter, Tag, Mark, Text, Heading } from "./Notes.styles";
import { Form, Group, Input } from "../../components/styles/Form";
import { filterByTags } from "../../helpers/arrayHelpers";
import Highlight from "react-highlight-words";
import Dropdown, { Menu } from "../dropdown/Dropdown";
import { normalize } from "../../helpers/utils";

const LOCALSTORAGE_KEY = "ldex_showTags";

const Notes = ({
  privacy,
  setPrivacy,
  shared,
  notes,
  user,
  id: dexId,
  createNote,
  deleteNote,
  championA,
  championB,
}) => {
  const [query, setQuery] = useState([]);
  const [show, setShow] = useState(true);
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState(null);
  const [, copyToClipboard] = useClipboard();
  const [value, setValue] = useState("");
  const [hidden, setHidden] = useState(true);
  const ref = useRef();

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    if (typeof item === "boolean") {
      setHidden(item);
    } else {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(true));
      setHidden(true);
    }
  }, []);

  const handleSetHidden = () => {
    const newValue = !hidden;
    setHidden(newValue);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newValue));
  };

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
      return filterByTags(notes, query);
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

  const handleCopy = () => {
    copyToClipboard(link);
    toast.info("copied link to clipboard");
  };

  // !TODO refactor when my brain can handle it ;')
  const suggestion = (tagName) => {
    let str = "";

    if (!value) {
      str = "";
      return;
    }

    if (value.split("@").length < 2) return "";
    value.split("@").forEach((word) => {
      const result = tags.filter((tag) => tag.toLowerCase().includes(word))[0];
      if (tags.includes(result)) {
        str = result;
      } else {
        str = word;
      }
    });

    return tagName.includes(str);
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

  // ugly code cus we can
  function toggleGlobalTags(content) {
    if (shared) return content;
    const champA = normalize(championA.name);
    const champB = normalize(championB.name);

    let replaced = content;

    if (hidden && query.length <= 0) {
      replaced = replaced.replace("global", "");
      replaced = replaced.replace(champA, "");
      replaced = replaced.replace(champB, "");
    } else {
      replaced = replaced.replace("global", "@global");
      replaced = replaced.replace(champA, `@${champA}`);
      replaced = replaced.replace(champB, `@${champB}`);
    }
    return replaced;
  }

  return (
    <Container>
      <Heading>
        <Title>
          {!privacy && !shared && (
            <FaLink className="clipboard" onClick={handleCopy} />
          )}
          {shared ? "Notes" : "Your notes"}
        </Title>
        {!shared && (
          <Dropdown show={show} handleSetShow={handleSetShow} w={140}>
            <Menu.Item small onClick={handleSetHidden}>
              {hidden ? "show" : "hide"}
            </Menu.Item>
          </Dropdown>
        )}
      </Heading>
      <Filter mt={tags.length <= 0 ? "2rem" : "1rem"}>
        {shared && notes.length <= 0 && "There are no notes for this matchup."}
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
              suggested={suggestion(tag)}
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
        <PoseGroup>
          {notes.length > 0 &&
            [...filteredNotes()]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((note) => (
                <Item key={note.id}>
                  <Highlight
                    searchWords={query}
                    highlightClassName="highlightNote"
                    textToHighlight={toggleGlobalTags(note.content)}
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
              ))}
        </PoseGroup>
      </List>
    </Container>
  );
};

export default Notes;

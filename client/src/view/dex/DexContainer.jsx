import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Dex from "./Dex";
import { getToken } from "../../helpers/getToken";
import { useMatch } from "../../hooks/useMatch";

const fetchNotes = async (id) => {
  const res = await fetch(`/api/note/dex/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });
  return res.json();
};

const fetchLatest = async (id) => {
  const res = await fetch(`/api/matchup/latest/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });
  return res.json();
};

const fetchCreateNote = async (payload) => {
  const res = await fetch(`/api/note/create`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });

  return res.json();
};

const DexContainer = ({ history }) => {
  const { id } = useParams();
  const { setMatch, match } = useMatch();
  const [notes, setNotes] = useState([]);

  const createNote = async (e, noteValue) => {
    e.preventDefault();

    const data = await fetchCreateNote({
      content: noteValue,
      matchupId: id,
      tags: null,
    });

    setNotes((current) => [...current, data]);
  };

  const finishMatch = (e) => {
    e.preventDefault();
    (async () => {
      if (match && match.gameId) {
        try {
          const data = await fetchLatest(match.gameId);
          if (data.updated) {
            history.push("/");
            setMatch(null);
          }
        } catch (err) {
          return null;
        }
      } else {
        history.push("/");
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchNotes(id);
        setNotes(data);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      setNotes([]);
    };
  }, [id]);

  return (
    <Dex
      finishMatch={finishMatch}
      createNote={createNote}
      notes={notes}
      history={history}
    />
  );
};

export default DexContainer;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Dex from "./Dex";
import { getToken } from "../../helpers/getToken";
import { parseTags } from "../../helpers/parseTags";
import { toast } from "react-toastify";

const fetchDex = async (id) => {
  const res = await fetch(`/api/matchup/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });
  const data = await res.json();
  return { data, res };
};

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

const fetchDeleteNote = async (noteId) => {
  const res = await fetch(`/api/note/${noteId}`, {
    method: "DELETE",
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
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [dex, setDex] = useState(null);

  const createNote = async (value) => {
    const tags = parseTags(value);
    try {
      const data = await fetchCreateNote({
        content: value,
        matchupId: id,
        tags: tags.length > 0 ? tags.toString() : "",
      });
      setNotes((current) => [...current, data]);
    } catch (err) {
      toast.error("Something went wrong...");
    }
  };

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          setLoading(true);
          const { res, data } = await fetchDex(id);
          if (res.status === 404) {
            history.push("/");
          }
          const _data = await fetchNotes(id);

          setNotes(_data);
          setDex(data);
          setLoading(false);
        } catch (err) {
          history.push("/");
        }
      }
    })();

    return () => {
      setNotes([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const deleteNote = async (e, noteId) => {
    e.preventDefault();
    fetchDeleteNote(noteId)
      .then((data) => {
        const newNotes = notes.filter((note) => note.id !== noteId);
        setNotes(newNotes);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Dex
      createNote={createNote}
      notes={notes}
      history={history}
      dex={dex}
      loading={loading}
      deleteNote={deleteNote}
    />
  );
};

export default DexContainer;

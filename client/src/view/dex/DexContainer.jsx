import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Dex from "./Dex";
import { parseTags } from "../../helpers/parseTags";
import { toast } from "react-toastify";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";
import { build, loadAssets } from "../../helpers/loadImages";
import { useMatch } from "../../hooks/useMatch";
import { Helmet } from "react-helmet-async";
import makeRequest from "../../helpers/makeRequest";
import removeTagsFromNotes, {
  removeChar,
} from "../../helpers/removeTagsFromNotes";

const fetchDex = async (id) => {
  const res = await makeRequest(`/api/matchup/${id}`);
  const data = await res.json();
  return { data, res };
};

const fetchNotes = async (id, championA, championB) => {
  const params = new URLSearchParams({
    championA,
    championB,
  });
  const res = await makeRequest(`/api/note/dex/${id}?${params}`);
  return res.json();
};

const fetchCreateNote = async (payload) => {
  const res = await makeRequest(`/api/note/create`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.json();
};

const fetchDeleteNote = async (noteId) => {
  const res = await makeRequest(`/api/note/${noteId}`, {
    method: "DELETE",
  });
  return res.json();
};

const DexContainer = ({ history }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const { isLive, setDex, dex } = useMatch();

  const createNote = async (value) => {
    const tags = parseTags(value);

    try {
      const data = await fetchCreateNote({
        content: value,
        matchupId: id,
        championId: dex.champion_id,
        tags: tags.length > 0 ? tags.toString() : "",
      });
      setNotes((current) => [...current, removeChar(data)]);
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

          setDex(data);

          const _data = await fetchNotes(
            id,
            data.championA.name,
            data.championB.name
          );
          const assets = build([data.championA, data.championB], 2);
          await loadAssets(assets);

          setNotes(removeTagsFromNotes(_data));

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
      .then((_) => {
        const newNotes = notes.filter((note) => note.id !== noteId);
        setNotes(newNotes);
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return (
      <Loader.Container hide={!loading} secondary>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Leaguedex - Champion Dex</title>
      </Helmet>

      <Dex
        createNote={createNote}
        notes={notes}
        history={history}
        dex={dex}
        loading={loading}
        deleteNote={deleteNote}
        isLive={isLive}
      />
    </>
  );
};

export default DexContainer;

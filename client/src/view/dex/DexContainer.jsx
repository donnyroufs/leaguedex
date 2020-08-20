import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Dex from "./Dex";
import { getToken } from "../../helpers/getToken";
import { useMatch } from "../../hooks/useMatch";
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
  const [loading, setLoading] = useState(true);
  const { setMatch, match } = useMatch();
  const [notes, setNotes] = useState([]);
  const [dex, setDex] = useState(null);

  const createNote = async (value) => {
    try {
      const data = await fetchCreateNote({
        content: value,
        matchupId: id,
        tags: "",
      });
      setNotes((current) => [...current, data]);
    } catch (err) {
      toast.error("Something went wrong...");
    }
  };

  const finishMatch = async (e) => {
    e.preventDefault();
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
          setLoading(false);
        } catch (err) {
          history.push("/");
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Dex
      finishMatch={finishMatch}
      createNote={createNote}
      notes={notes}
      history={history}
      dex={dex}
      loading={loading}
    />
  );
};

export default DexContainer;

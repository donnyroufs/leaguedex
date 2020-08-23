import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Dex from "./Dex";
import { getToken } from "../../helpers/getToken";

const fetchDex = async (id, username) => {
  const res = await fetch(`/api/shared/${username}/dex?id=${id}`, {
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

const fetchNotes = async (id, username) => {
  const res = await fetch(`/api/shared/${username}/dex/note?id=${id}`, {
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
  const { id, username } = useParams();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [dex, setDex] = useState(null);

  useEffect(() => {
    (async () => {
      if (id && username) {
        try {
          setLoading(true);
          const { res, data } = await fetchDex(id, username);
          if (res.status === 404) {
            history.push("/");
          }
          const _data = await fetchNotes(id, data.user_id);
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

  return (
    <Dex
      shared={true}
      createNote={() => null}
      notes={notes}
      history={history}
      dex={dex}
      loading={loading}
    />
  );
};

export default DexContainer;

import React, { useState, useEffect } from "react";
import { Container } from "./Dex.styles";
import { useParams } from "react-router";
import { getToken } from "../../helpers/getToken";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";

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

const Dex = ({ finishMatch, createNote, notes, history }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [dex, setDex] = useState(null);
  const { id } = useParams();

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

  if (loading) {
    return (
      <Loader.Container hide={!loading && "true"} secondary>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  return (
    <Container>
      <Container>
        <p>played games: {dex.games_played}</p>
        <button onClick={finishMatch}>Game finished?</button>
      </Container>
      <Container>
        <form
          onSubmit={(e) => {
            createNote(e, value);
            setValue("");
          }}
          style={{ marginBottom: "3rem" }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "column nowrap",
              width: "300px",
              marginTop: "2rem",
            }}
          >
            <label>Add an awesome note.</label>
            <p>
              <strong>Remember to stay calm if ur ian.</strong>
            </p>
            <input
              style={{ padding: ".5rem", marginTop: ".25rem" }}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Add note"
              required
            />
          </div>
        </form>
        {notes.length > 0 &&
          notes.map((note) => <p key={note.id}>{note.content}</p>)}
      </Container>
    </Container>
  );
};

export default Dex;

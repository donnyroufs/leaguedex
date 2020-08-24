import React, { useState, useEffect } from "react";
import Match from "./Match";
import { useMatch } from "../../hooks/useMatch";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";

const MatchContainer = ({ history }) => {
  const [selected, setSelected] = useState(null);
  const { createMatchup, match, hasMatch, confirmed, loading } = useMatch();

  const selectChampion = ({ id, name }) => {
    setSelected(id);
  };

  const selectRole = async (role) => {
    const dexId = await createMatchup(selected, role);
    history.push(`/dex/${dexId}`);
  };

  useEffect(() => {
    if (!hasMatch) {
      history.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMatch, confirmed]);

  if (loading) {
    return (
      <Loader.Container hide={!loading} secondary>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  return (
    <Match
      match={match}
      selected={selected}
      selectChampion={selectChampion}
      selectRole={selectRole}
    />
  );
};

export default MatchContainer;

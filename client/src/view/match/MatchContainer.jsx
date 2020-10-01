import React, { useState, useEffect } from "react";
import Match from "./Match";
import { useMatch } from "../../hooks/useMatch";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { useStatus } from "../../hooks/useStatus";

const MatchContainer = ({ history }) => {
  const [selected, setSelected] = useState(null);
  const { setStatus } = useStatus();
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

    return () => {
      setStatus("");
    };

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
    <>
      <Helmet>
        <title>Leaguedex - Match Found</title>
      </Helmet>
      <Match
        match={match}
        selected={selected}
        selectChampion={selectChampion}
        selectRole={selectRole}
        setStatus={setStatus}
      />
    </>
  );
};

export default MatchContainer;

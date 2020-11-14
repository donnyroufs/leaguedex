import React from "react";
import Settings from "./Settings";
import { Helmet } from "react-helmet-async";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";
import { useMeQuery } from "../../hooks/useMeQuery";


const SettingsContainer = () => {
  const { me, loading } = useMeQuery();

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
        <title>Leaguedex - settings</title>
      </Helmet>
      <Settings me={me} />
    </>
  );
};

export default SettingsContainer;

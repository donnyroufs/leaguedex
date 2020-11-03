import React from "react";
import Settings from "./Settings";
import { Helmet } from "react-helmet-async";

const SettingsContainer = () => {
  return (
    <>
      <Helmet>
        <title>Leaguedex - settings</title>
      </Helmet>
      <Settings />
    </>
  );
};

export default SettingsContainer;

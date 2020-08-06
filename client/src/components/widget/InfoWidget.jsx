import React from "react";
import Widget from "./Widget";
import { Text } from "./Widget.styles";
import { useAuth } from "../../hooks/useAuth";

const InfoWidget = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Widget title="Info card">
      {isAuthenticated && user.summoner && (
        <>
          <Text>matchups recorded: 0</Text>
          <Text>champions played: 0</Text>
        </>
      )}

      {!isAuthenticated && <Text>You need to be logged in.</Text>}
      {isAuthenticated && !user.summoner && (
        <Text>You need to add your league account.</Text>
      )}
    </Widget>
  );
};

export default InfoWidget;

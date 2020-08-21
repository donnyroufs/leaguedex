import React from "react";
import Widget from "./Widget";
import { Text } from "./Widget.styles";
import { useAuth } from "../../hooks/useAuth";

const InfoWidget = ({ count, gamesPlayed }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Widget title="Info">
      {isAuthenticated && user.summoner && (
        <>
          <Text>Matchups played: {count}</Text>
          <Text>Total games: {gamesPlayed}</Text>
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

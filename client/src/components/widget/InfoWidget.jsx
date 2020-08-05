import React from "react";
import Widget from "./Widget";
import { Text } from "./Widget.styles";
import { useAuth } from "../../hooks/useAuth";

const InfoWidget = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Widget title="Info card">
      {isAuthenticated && (
        <>
          <Text>matchups recorded: 0</Text>
          <Text>champions played: 0</Text>
        </>
      )}

      {!isAuthenticated && <Text>You need to be logged in.</Text>}
    </Widget>
  );
};

export default InfoWidget;

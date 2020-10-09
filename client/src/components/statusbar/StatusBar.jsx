import React from "react";
import { Container, Button } from "./StatusBar.styles";
import { useMatch } from "../../hooks/useMatch";
import { useStatus } from "../../hooks/useStatus";

const StatusBar = ({
  handleMatchupSelection,
  handleLiveMatch,
  msg,
  isAuthenticated,
  hasSummoner,
  handleFindMatch,
  handleRevertMatchup,
  status,
}) => {
  const { hasMatch, confirmed, loading } = useMatch();
  const { dex } = useStatus();

  return (
    <Container>
      <Container.Inner>
        <Container.Status>
          {/* If not logged in */}
          {!isAuthenticated && msg.LOG_IN}
          {/* If logged in but no summoner account */}
          {isAuthenticated && !hasSummoner && msg.ADD_SUMMONER}
          {/* If we are searching for the live match */}
          {isAuthenticated && loading && msg.SEARCHING}
          {/* If logged in and we have a summoner account and not searching */}
          {isAuthenticated && !loading && hasSummoner && (
            <>
              {/* If we dont have a match */}
              {!hasMatch && msg.INITIAL}
              {/* If we do have a match */}
              {hasMatch &&
                !confirmed &&
                `${msg.IN_MATCH} - ${
                  status ? status : "go pick your matchup!"
                }`}
              {/* We have a match and we have selected the matchup */}
              {hasMatch && confirmed && msg.CONFIRMED_MATCH}
            </>
          )}
        </Container.Status>
        <Container.Actions>
          {/* If we are logged in and have a summoner account */}
          {isAuthenticated && hasSummoner && (
            <>
              {/* If we dont have a match */}
              {!hasMatch && (
                <Button onClick={handleFindMatch}>Find Match</Button>
              )}
              {/* If we do have a match */}
              {hasMatch && !confirmed && (
                <Button onClick={handleMatchupSelection}>Select Matchup</Button>
              )}
              {/* We have a match and we have selected the matchup */}
              {hasMatch && confirmed && (
                <>
                  {dex && (
                    <Button secondary onClick={handleRevertMatchup}>
                      Revert Matchup
                    </Button>
                  )}
                  <Button onClick={handleLiveMatch}>Go To Match</Button>
                </>
              )}
            </>
          )}
        </Container.Actions>
      </Container.Inner>
    </Container>
  );
};

export default StatusBar;

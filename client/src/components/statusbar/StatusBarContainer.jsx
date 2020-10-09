import React from "react";
import StatusBar from "./StatusBar";
import { useHistory } from "react-router-dom";
import { useStatus } from "../../hooks/useStatus";
import { toast } from "react-toastify";
import makeRequest from "../../helpers/makeRequest";

const STATUS_MESSAGES = {
  INITIAL: "Are you currently in a match?",
  LOG_IN: "Match status becomes available when logged in",
  ADD_SUMMONER: "Get started by adding your summoner account",
  IN_MATCH: "In matchup select",
  CONFIRMED_MATCH: "You are currently in a live match",
  // CONFIRMED_MATCH: ({ championA, championB, lane }) =>
  //   `You are currently in a match as ${championA.name} playing against ${championB.name} at ${lane} lane`,
  NO_MATCH_FOUND: "Looks like you are not in a match",
  SEARCHING: "Searching...",
};

async function fetchRevertMatchup({ lane, champion_id, games_played: gamesPlayed, opponent_id }) {
  const params = new URLSearchParams({
    lane,
    champion_id,
    gamesPlayed,
    opponent_id,
  });
  const res = await makeRequest(`/api/matchup/revert?${params}`, {
    method: "PUT"
  });
  return res.status === 204
}

const StatusBarContainer = ({ revertMatch, ...props }) => {
  const history = useHistory();
  const { status, dex } = useStatus();

  const handleRevertMatchup = async () => {
    try {
      const response = await fetchRevertMatchup(dex);
      if (!response) {
        return toast.error(
          "Couldn't revert matchup, perhaps you need to remove your current notes."
        );
      }
      revertMatch(history);
    } catch (err) {
      toast.error("Something went wrong on our end.");
    }
  };

  return (
    <StatusBar
      {...props}
      msg={STATUS_MESSAGES}
      status={status}
      handleRevertMatchup={handleRevertMatchup}
    />
  );
};

export default StatusBarContainer;

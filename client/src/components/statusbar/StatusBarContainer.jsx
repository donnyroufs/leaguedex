import React from "react";
import StatusBar from "./StatusBar";

const STATUS_MESSAGES = {
  INITIAL: "Are you currently in a match?",
  LOG_IN: "See match status by logging in",
  ADD_SUMMONER: "Get started by adding your summoner account",
  IN_MATCH: "In matchup select",
  CONFIRMED_MATCH: "You are currently in a live match",
  // CONFIRMED_MATCH: ({ championA, championB, lane }) =>
  //   `You are currently in a match as ${championA.name} playing against ${championB.name} at ${lane} lane`,
  NO_MATCH_FOUND: "Looks like you are not in a match",
  SEARCHING: "Searching...",
};

const StatusBarContainer = (props) => {
  return <StatusBar {...props} msg={STATUS_MESSAGES} />;
};

export default StatusBarContainer;

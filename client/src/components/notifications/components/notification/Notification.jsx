import React from "react";
import types from "../../../../types";
import * as SC from "./Notification.styles";
import Mark from "../mark/Mark";
import ReactTooltip from "react-tooltip";

const Notification = ({ id, handleChoice, choices, me, opponent }) => {
  const hasChosen = choices[id];
  const wonStatus = me.win ? "W" : "L";

  function onHandleChoice(type) {
    handleChoice(id, type);
  }

  return (
    <SC.Container>
      <ReactTooltip backgroundColor="#232f3e" />
      <SC.Info>
        <SC.Lane data-tip="Your played lane">
          {me.lane.charAt(0).toUpperCase()}
        </SC.Lane>
        <SC.Result data-tip="Whether you won the game or not" win={me.win}>
          {wonStatus}
        </SC.Result>
        <SC.Details>
          {me.championA.name} vs {opponent.championB.name}
        </SC.Details>
      </SC.Info>
      <SC.ConfirmWrapper>
        <Mark
          type={types.CONFIRM}
          checked={hasChosen && choices[id] === types.CONFIRM}
          handleChoice={onHandleChoice}
        />
        <Mark
          type={types.CANCEL}
          checked={hasChosen && choices[id] === types.CANCEL}
          handleChoice={onHandleChoice}
        />
      </SC.ConfirmWrapper>
    </SC.Container>
  );
};

export default Notification;

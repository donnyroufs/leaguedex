import React from "react";
import types from "../../../../types";
import * as SC from "./Notification.styles";
import Mark from "../mark/Mark";

const Notification = ({
  id,
  handleChoice,
  choices,
  lane,
  win,
  championA,
  championB,
}) => {
  const hasChosen = choices[id];
  const wonStatus = win ? "W" : "L";

  function onHandleChoice(type) {
    handleChoice(id, type);
  }

  return (
    <SC.Container>
      <SC.Info>
        <SC.Lane>{lane.charAt(0).toUpperCase()}</SC.Lane>
        <SC.Result win={win}>{wonStatus}</SC.Result>
        <SC.Details>
          {championA} vs {championB}
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

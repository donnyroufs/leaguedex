import React from "react";
import * as SC from "./Notification.styles";
import { ReactComponent as MarkConfirm } from "./yes-icon.svg";
import { ReactComponent as MarkCancel } from "./no-icon.svg";

const Notification = ({ lane, win, championA, championB }) => {
  const wonStatus = win ? "W" : "L";

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
        <MarkConfirm />
        <MarkCancel />
      </SC.ConfirmWrapper>
    </SC.Container>
  );
};

export default Notification;

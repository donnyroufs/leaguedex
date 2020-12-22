import React from "react";
import * as SC from "./Mark.styles.js";
import types from "../../../../types";

const Mark = ({ type, checked, handleChoice }) => {
  if (type === types.CONFIRM) {
    return (
      <SC.MarkConfirm
        checked={checked}
        onClick={() => handleChoice(types.CONFIRM)}
      />
    );
  } else {
    return (
      <SC.MarkCancel
        checked={checked}
        onClick={() => handleChoice(types.CANCEL)}
      />
    );
  }
};

export default Mark;

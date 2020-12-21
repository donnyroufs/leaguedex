import React from "react";
import * as SC from "./Notification.styles";

const Notification = () => {
  const count = 2;
  return (
    <SC.Container>
      <SC.IconWrapper>
        <SC.Icon />
        {count > 0 && <SC.Bubble>{count}</SC.Bubble>}
      </SC.IconWrapper>
    </SC.Container>
  );
};

export default Notification;

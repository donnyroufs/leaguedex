import React, { useState } from "react";
import { Button } from "../../GlobalStyles";
import * as SC from "./Notification.styles";
import { ReactComponent as MarkConfirm } from "./yes-icon.svg";
import { ReactComponent as MarkCancel } from "./no-icon.svg";

const Notification = () => {
  const [show, setShow] = useState(true);

  const count = 2;

  return (
    <SC.Container>
      <SC.IconWrapper onClick={() => setShow((curr) => !curr)}>
        <SC.Icon />
        {count > 0 && <SC.Bubble>{count}</SC.Bubble>}
      </SC.IconWrapper>
      <SC.Wrapper show={show}>
        <SC.Heading>Unconfirmed matches</SC.Heading>
        <SC.Dropdown>
          <SC.Item>
            <SC.Info>
              <SC.Lane>T</SC.Lane>
              <SC.Result win={true}>W</SC.Result>
              <SC.Details>Akali vs Renekton</SC.Details>
            </SC.Info>
            <SC.ConfirmWrapper>
              {/* <MarkConfirm />
              <MarkCancel /> */}
            </SC.ConfirmWrapper>
          </SC.Item>
        </SC.Dropdown>
        <SC.Footer>
          <Button logout style={{ width: "100%", marginLeft: "0" }}>
            Confirm
          </Button>
        </SC.Footer>
      </SC.Wrapper>
    </SC.Container>
  );
};

export default Notification;

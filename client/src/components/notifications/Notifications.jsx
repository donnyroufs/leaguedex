import React, { useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Button } from "../../GlobalStyles";
import * as SC from "./Notifications.styles";
import Notification from "./components/notification/Notification";
import { useNotifications } from "../../hooks/useNotifications";

const Notifications = () => {
  const [show, setShow] = useState(false);
  const [choices, setChoices] = useState({});
  const { notifications } = useNotifications();

  const ref = useOnclickOutside(() => {
    setShow(false);
  });

  useEffect(() => {
    if (!show) {
      setChoices({});
    }
  }, [show]);

  function handleChoice(id, confirmed) {
    setChoices((curr) => ({
      ...curr,
      [id]: confirmed,
    }));
  }

  const count = notifications.length;

  return (
    <SC.Container ref={ref}>
      <SC.IconWrapper onClick={() => setShow((curr) => !curr)}>
        <SC.Icon />
        {count > 0 && <SC.Bubble>{count}</SC.Bubble>}
      </SC.IconWrapper>
      <SC.Wrapper show={show}>
        <SC.Heading>Unconfirmed matches</SC.Heading>
        <SC.Dropdown>
          {count > 0 &&
            notifications.map((notification) => (
              <Notification
                {...notification}
                choices={choices}
                handleChoice={handleChoice}
                key={notification.id}
              />
            ))}
          {count <= 0 && <p>There are no matches to confirm!</p>}
        </SC.Dropdown>
        <SC.Footer>
          <Button
            disabled={count <= 0}
            logout
            style={{ width: "100%", marginLeft: "0" }}
          >
            Confirm
          </Button>
        </SC.Footer>
      </SC.Wrapper>
    </SC.Container>
  );
};

export default Notifications;

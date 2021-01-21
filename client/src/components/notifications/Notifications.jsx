import React, { useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Button } from "../../GlobalStyles";
import * as SC from "./Notifications.styles";
import Notification from "./components/notification/Notification";
import { useNotifications } from "../../hooks/useNotifications";
import { BeatLoader } from "react-spinners";
import theme from "../../theme";

const Notifications = () => {
  const [show, setShow] = useState(false);
  const [choices, setChoices] = useState({});
  const { notifications, updateNotifications, loading } = useNotifications();

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

  async function handleOnConfirm(e) {
    e.preventDefault();
    if (Object.values(choices).length <= 0) return;

    // Get all the match data for the choices
    const gamesData = Object.entries(choices).map(([gameId, state]) => {
      const data = notifications.find((g) => g.id === gameId);

      return {
        gameId,
        champion_id: data.me.championA.id,
        opponent_id: data.opponent.championB.id,
        state,
        lane: data.me.lane,
        win: data.me.win,
      };
    });

    await updateNotifications(gamesData);

    setChoices({});
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
          {count <= 0 && (
            <p style={{ lineHeight: 1.8, opacity: 0.7 }}>
              You do not seem to have any old matches since your last recorded
              matchup.
            </p>
          )}
        </SC.Dropdown>

        {count > 0 && (
          <SC.Footer>
            <Button
              disabled={count <= 0}
              logout
              style={{ width: "100%", marginLeft: "0" }}
              onClick={handleOnConfirm}
            >
              {loading && <BeatLoader color={theme.secondary} height="100%" />}
              {!loading && "Confirm"}
            </Button>
          </SC.Footer>
        )}
      </SC.Wrapper>
    </SC.Container>
  );
};

export default Notifications;

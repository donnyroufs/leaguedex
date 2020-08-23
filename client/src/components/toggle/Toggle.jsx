import React, { useRef, useEffect } from "react";
import { Container } from "./Toggle.styles";
import { getToken } from "../../helpers/getToken";

const fetchUpdatePrivacy = async (query) => {
  const res = await fetch(`/api/matchup/private${query}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });
  return res.json();
};

const Toggle = ({ lane, champion_id, opponent_id, privacy, setPrivacy }) => {
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    fetchUpdatePrivacy(
      `?lane=${lane}&champion_id=${champion_id}&opponent_id=${opponent_id}&private=${privacy}`
    ).catch((err) => console.error(err));
  }, [privacy, lane, champion_id, opponent_id]);

  return (
    <Container>
      <Container.Option
        selected={privacy === true}
        onClick={() => setPrivacy(true)}
      >
        Private
      </Container.Option>
      <Container.Option
        selected={privacy === false}
        onClick={() => setPrivacy(false)}
      >
        Public
      </Container.Option>
    </Container>
  );
};

export default Toggle;

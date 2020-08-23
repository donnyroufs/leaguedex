import React, { useState, useRef, useEffect } from "react";
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

const Toggle = ({ lane, champion_id, opponent_id, private: privacy }) => {
  const initialLoad = useRef(true);
  const [state, setState] = useState(privacy);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    fetchUpdatePrivacy(
      `?lane=${lane}&champion_id=${champion_id}&opponent_id=${opponent_id}&private=${state}`
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [state, lane, champion_id, opponent_id, privacy]);

  return (
    <Container>
      <Container.Option
        selected={state === true}
        onClick={() => setState(true)}
      >
        Private
      </Container.Option>
      <Container.Option
        selected={state === false}
        onClick={() => setState(false)}
      >
        Public
      </Container.Option>
    </Container>
  );
};

export default Toggle;

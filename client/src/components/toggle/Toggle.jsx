import React from "react";
import { Container } from "./Toggle.styles";
import { getToken } from "../../helpers/getToken";

const fetchUpdatePrivacy = async (query) => {
  return fetch(`/api/matchup/private${query}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });
};

const Toggle = ({ lane, champion_id, opponent_id, privacy, setPrivacy }) => {
  const handleClick = (value) => {
    fetchUpdatePrivacy(
      `?lane=${lane}&champion_id=${champion_id}&opponent_id=${opponent_id}&private=${value}`
    )
      .then(() => setPrivacy(value))
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Container.Option
        selected={privacy === true}
        onClick={() => handleClick(true)}
      >
        Private
      </Container.Option>
      <Container.Option
        selected={privacy === false}
        onClick={() => handleClick(false)}
      >
        Public
      </Container.Option>
    </Container>
  );
};

export default Toggle;

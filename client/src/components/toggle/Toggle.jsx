import React from "react";
import { Container } from "./Toggle.styles";
import { getToken } from "../../helpers/getToken";
import { toast } from "react-toastify";

const makeQuery = ({
  lane,
  champion_id,
  opponent_id,
  private: privacy,
  all,
}) => {
  const params = new URLSearchParams({ lane, champion_id, private: !privacy });
  if (opponent_id) {
    params.set("opponent_id", opponent_id);
  }

  if (all) {
    params.set("all", all);
  }

  return params;
};

const fetchUpdatePrivacy = async (payload) => {
  const query = makeQuery(payload);
  return fetch(`/api/matchup/private?${query}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    credentials: "include",
  });
};

const Toggle = ({
  lane,
  champion_id,
  opponent_id,
  privacy,
  setPrivacy,
  all,
}) => {
  const handleClick = (value) => {
    fetchUpdatePrivacy({
      lane,
      champion_id,
      opponent_id,
      private: privacy,
      all,
    })
      .then(() => {
        setPrivacy(value);
        toast.info("Updated privacy settings successfully");
      })
      .catch((err) =>
        toast.error("Something went wrong. Could not update privacy settings.")
      );
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

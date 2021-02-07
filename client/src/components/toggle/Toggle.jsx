import React from "react";
import { Container, Button } from "./Toggle.styles";
import { toast } from "react-toastify";
import { FaLock, FaUnlock } from "react-icons/fa";
import makeRequest from "../../helpers/makeRequest";

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

async function fetchUpdatePrivacy(payload) {
  const query = makeQuery(payload);
  return makeRequest(`/api/matchup/private?${query}`, {
    method: "PUT",
  });
}

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
      .catch((_) =>
        toast.error("Something went wrong. Could not update privacy settings.")
      );
  };

  return (
    <Container>
      <Button onClick={() => handleClick(!privacy)}>
        {privacy ? (
          <FaLock style={{ marginRight: ".5rem" }} />
        ) : (
          <FaUnlock style={{ marginRight: ".5rem" }} />
        )}
        {privacy ? "Private" : "Public"}
      </Button>
    </Container>
  );
};

export default Toggle;

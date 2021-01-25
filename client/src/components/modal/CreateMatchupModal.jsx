import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import useOnclickOutside from "react-cool-onclickoutside";
import {
  Form,
  Footer,
  FlashMessage,
  Group,
  Select,
  Label,
} from "../styles/Form";
import { Button } from "../../GlobalStyles";
import { BeatLoader } from "react-spinners";
import theme from "../../theme";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { API } from "../../api/index";
import { useChampions } from "../../hooks/useChampions";
import { useHistory } from "react-router";

const initialValues = {
  opponent: "",
  lane: "",
};

const CreateMatchupModal = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lanes, setLanes] = useState([]);
  const [opponents, setOpponents] = useState([]);

  const { isAuthenticated, user } = useAuth();
  const { setModal, isOpen, modal, setReverse, reverse } = useModal();
  const { championA } = useChampions();
  const innerRef = useRef();
  const history = useHistory();

  const ref = useOnclickOutside(() => {
    if (isOpen("create-matchup")) {
      setReverse(true);
      setTimeout(() => {
        setReverse(false);
        setModal(null);
      }, 300);
    }
  });

  const handleOnChange = (e) => {
    if (values.opponent && values.lane && e.target.name === "opponent") {
      setValues({
        ...initialValues,
        opponent: e.target.value,
      });
      return;
    }

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  async function onAdd(e) {
    e.preventDefault();

    if (!championA.id || !values.opponent || !values.lane) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    const dexId = await API.createManualMatchup(
      championA.id,
      values.opponent,
      values.lane
    );

    history.push(`/dex/${dexId}`);
    setModal(null);

    setErrorMessage(null);
  }

  useEffect(() => {
    setErrorMessage(null);
    setValues({
      ...initialValues,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  useEffect(() => {
    if (!championA) return;
    API.getOpponents(championA.id).then(setOpponents);
    API.getAvailableLanes(championA.id, values.opponent).then(setLanes);
  }, [values.opponent, championA]);

  useEffect(() => innerRef.current && innerRef.current.focus(), [isOpen]);

  return (
    <Modal
      isOpen={isOpen("create-matchup")}
      title="create matchup"
      clickedOutside={ref}
      reverse={reverse}
    >
      {loading || (!championA && <BeatLoader />)}
      {!loading && championA && (
        <Form onSubmit={() => null} autoComplete="off">
          <FlashMessage>
            <FlashMessage.Inner>{errorMessage}</FlashMessage.Inner>
          </FlashMessage>
          <Group auth>
            <Label htmlFor="opponent">Opponent</Label>
            <Select
              name="opponent"
              onChange={handleOnChange}
              value={values.opponent}
            >
              <option
                disabled={true}
                value=""
                style={{
                  display: "block",
                  paddingBottom: "1rem",
                  backgroundColor: "#2c3a4a",
                }}
              >
                Choose an opponent...
              </option>
              {opponents.map((opponent) => (
                <option
                  key={opponent.id}
                  value={opponent.id}
                  style={{
                    display: "block",
                    paddingBottom: "1rem",
                    backgroundColor: "#2c3a4a",
                  }}
                >
                  {opponent.name}
                </option>
              ))}
            </Select>
          </Group>
          <Group auth>
            <Label htmlFor="lane">Lane</Label>
            <Select
              disabled={!values.opponent}
              name="lane"
              onChange={handleOnChange}
              value={values.lane}
            >
              <option
                disabled={true}
                value=""
                style={{
                  display: "block",
                  paddingBottom: "1rem",
                  backgroundColor: "#2c3a4a",
                }}
              >
                Choose a lane...
              </option>
              {lanes.map((lane) => (
                <option
                  key={lane}
                  value={lane}
                  style={{
                    display: "block",
                    paddingBottom: "1rem",
                    backgroundColor: "#2c3a4a",
                  }}
                >
                  {lane}
                </option>
              ))}
            </Select>
          </Group>
          <Button
            type="submit"
            form="true"
            onClick={onAdd}
            disabled={loading || !values.lane}
          >
            {loading && <BeatLoader color={theme.secondary} height="100%" />}
            {!loading && "Add Matchup"}
          </Button>
        </Form>
      )}
      <Footer>
        <Footer.Close onClick={() => setModal(null)}>
          close &times;
        </Footer.Close>
      </Footer>
    </Modal>
  );
};

export default CreateMatchupModal;

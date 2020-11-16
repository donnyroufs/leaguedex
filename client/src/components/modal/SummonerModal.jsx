import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import useOnclickOutside from "react-cool-onclickoutside";
import {
  Form,
  Input,
  Label,
  Group,
  Footer,
  Select,
  FlashMessage,
} from "../styles/Form";
import { Button } from "../../GlobalStyles";
import { BeatLoader } from "react-spinners";
import theme from "../../theme";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import decode from "jwt-decode";
import makeRequest from "../../helpers/makeRequest";

const initialValues = {
  summonerName: "",
  region: "euw1",
};

async function fetchRegions() {
  const res = await makeRequest(`/api/user/region`);
  return res.json();
}

async function fetchSummoner(data) {
  const res = await makeRequest(`/api/user/summoner`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

const SummonerModal = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState(null);
  const [regions, setRegions] = useState([]);

  const { isAuthenticated, user, setUser, refreshToken } = useAuth();
  const { setModal, isOpen, modal, setReverse, reverse } = useModal();
  const innerRef = useRef();

  const ref = useOnclickOutside(() => {
    if (isOpen("summoner")) {
      setReverse(true);
      setTimeout(() => {
        setReverse(false);
        setModal(null);
      }, 300);
    }
  });

  const handleOnChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSummoner = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = await fetchSummoner(values);
      setUser(userData);
      toast.info("Added account successfully.");
      setModal(null);
    } catch (err) {
      toast.error("Summoner does not seem to exist.");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const data = await fetchRegions();
      if (!data) console.error("No regions found.");
      setRegions(data);
    })();
    if (isAuthenticated) {
      setErrorMessage(null);
      setValues({
        ...initialValues,
        summonerName: isAuthenticated ? user.username : "",
      });
      setModal(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, setModal]);

  useEffect(() => {
    setErrorMessage(null);
    setValues({
      ...initialValues,
      summonerName: isAuthenticated ? user.username : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  useEffect(() => innerRef.current && innerRef.current.focus(), [isOpen]);

  return (
    <Modal
      isOpen={isOpen("summoner")}
      title="add account"
      clickedOutside={ref}
      reverse={reverse}
    >
      <Form onSubmit={handleSummoner} autoComplete="off">
        <FlashMessage>
          <FlashMessage.Inner>{errorMessage}</FlashMessage.Inner>
        </FlashMessage>
        <Group auth>
          <Label>summoner name</Label>
          <Input
            type="text"
            name="summonerName"
            value={values.summonerName}
            placeholder={
              isAuthenticated ? user.username : "Enter summoner name"
            }
            ref={innerRef}
            onChange={handleOnChange}
          />
        </Group>
        <Group auth>
          <Label>Region</Label>
          <Select onChange={handleOnChange} name="region" value={values.region}>
            {Object.entries(regions).map(([region, value]) => (
              <option
                key={value}
                value={value}
                style={{
                  display: "block",
                  paddingBottom: "1rem",
                  backgroundColor: "#2c3a4a",
                }}
              >
                {region}
              </option>
            ))}
          </Select>
        </Group>
        <Button
          type="submit"
          form="true"
          onClick={handleSummoner}
          disabled={loading}
        >
          {loading && <BeatLoader color={theme.secondary} height="100%" />}
          {!loading && "Add Account"}
        </Button>
      </Form>
      <Footer>
        <Footer.Close onClick={() => setModal(null)}>
          close &times;
        </Footer.Close>
      </Footer>
    </Modal>
  );
};

export default SummonerModal;

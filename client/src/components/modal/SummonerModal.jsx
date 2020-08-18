import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import useOnclickOutside from "react-cool-onclickoutside";
import {
  Form,
  Input,
  Label,
  Group,
  Footer,
  FlashMessage,
} from "../styles/Form";
import { Button } from "../../GlobalStyles";
import { BeatLoader } from "react-spinners";
import theme from "../../theme";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import decode from "jwt-decode";

const initialValues = {
  summonerName: "",
};

const LoginModal = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState(null);

  const { isAuthenticated, getToken, user, setUser } = useAuth();
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

  const handleOnChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  const handleSummoner = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/user/summoner", {
        method: "POST",
        body: JSON.stringify({ summonerName: values.summonerName }),
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: getToken(),
        },
      });
      const { accessToken } = await response.json();
      const { data } = decode(accessToken);

      setUser({
        ...user,
        ...data,
      });
      toast.info("Added account successfully.");
      setModal(null);
    } catch (err) {
      toast.error("Something went wrong on our end. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setErrorMessage(null);
      setValues(initialValues);
      setModal(null);
    }
  }, [isAuthenticated, setModal]);

  useEffect(() => {
    setErrorMessage(null);
    setValues(initialValues);
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
        <Group>
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

export default LoginModal;

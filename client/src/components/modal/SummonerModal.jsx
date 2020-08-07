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

import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const initialValues = {
  summonerName: "",
};

const LoginModal = () => {
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
      const res = await fetch("/user/summoner", {
        method: "POST",
        body: JSON.stringify({ summonerName: values.summonerName }),
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: getToken(),
        },
      });

      const data = await res.json();

      setModal(null);
      if (data && data.status === "error") {
        toast.error("Something went wrong on our end. Please try again later.");
      } else {
        setUser({
          ...user,
          summoner: data,
        });
        toast.success("Added account successfully.");
      }
    } catch (err) {
      toast.error("Something went wrong on our end. Please try again later.");
      throw err;
    }
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
            placeholder="enter summoner name"
            ref={innerRef}
            onChange={handleOnChange}
          />
        </Group>
        <Button type="submit" form="true" onClick={handleSummoner}>
          add account
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

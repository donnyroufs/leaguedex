import React, { useState, useEffect, useRef } from "react";
import validateForm from "../../helpers/validateForm";
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
import { SUMMONER_FORM } from "../../constants";

import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";

const initialValues = {
  summonerName: "",
};

const LoginModal = () => {
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState(null);

  const { isAuthenticated } = useAuth();
  const { setModal, isOpen, modal } = useModal();
  const innerRef = useRef();

  const ref = useOnclickOutside(() => {
    if (isOpen("summoner")) {
      setModal(null);
    }
  });

  const handleOnChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  const handleSummoner = async (e) => {
    e.preventDefault();
    const { errors, valid } = validateForm(values, SUMMONER_FORM);
    const firstError = Object.values(errors)[0];
    setErrorMessage(firstError);
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
    <Modal isOpen={isOpen("summoner")} title="add account" clickedOutside={ref}>
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

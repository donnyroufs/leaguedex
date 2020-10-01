import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import useOnclickOutside from "react-cool-onclickoutside";
import validateForm from "../../helpers/validateForm";
import {
  Form,
  Input,
  Label,
  Group,
  Footer,
  FlashMessage,
} from "../styles/Form";
import { Button } from "../../GlobalStyles";
import { REGISTER_FORM } from "../../constants";
import theme from "../../theme";

import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { BeatLoader } from "react-spinners";

const initialValues = {
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const RegisterModal = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState(null);

  const { register, isAuthenticated } = useAuth();
  const { setModal, isOpen, modal, reverse, setReverse } = useModal();
  const innerRef = useRef();

  const ref = useOnclickOutside(() => {
    if (isOpen("register")) {
      setReverse(true);
      setTimeout(() => {
        setModal(null);
        setReverse(false);
      }, 300);
    }
  });

  const handleOnChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { errors, valid } = validateForm(values, REGISTER_FORM);
    if (valid) {
      const accountCreated = await register(values);
      if (!accountCreated) {
        setErrorMessage("Account or email already exists.");
      }
    } else {
      const firstError = Object.values(errors)[0];
      setErrorMessage(firstError);
    }
    setLoading(false);
  };

  const switchModal = (e) => {
    setModal("login");
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
      isOpen={isOpen("register")}
      title="register"
      clickedOutside={ref}
      reverse={reverse}
    >
      <Form
        onSubmit={handleRegister}
        autoComplete="off"
        onKeyDown={(e) => e.keyCode === 13 && handleRegister(e)}
      >
        <FlashMessage>
          <FlashMessage.Inner>{errorMessage}</FlashMessage.Inner>
        </FlashMessage>
        <Group>
          <Label>username</Label>
          <Input
            type="text"
            name="username"
            value={values.username}
            placeholder="enter username"
            ref={innerRef}
            onChange={handleOnChange}
          />
        </Group>
        <Group>
          <Label>email address</Label>
          <Input
            type="text"
            name="email"
            value={values.email}
            placeholder="enter email address"
            onChange={handleOnChange}
          />
        </Group>
        <Group>
          <Label>password</Label>
          <Input
            type="password"
            name="password"
            value={values.password}
            placeholder="enter password"
            onChange={handleOnChange}
          />
        </Group>
        <Group>
          <Label>retype password</Label>
          <Input
            type="password"
            name="password_confirmation"
            value={values.password_confirmation}
            placeholder="enter password"
            onChange={handleOnChange}
          />
        </Group>
        <Button form="true" onClick={handleRegister} disabled={loading}>
          {loading && <BeatLoader color={theme.secondary} height="100%" />}
          {!loading && "Register"}
        </Button>
      </Form>
      <Footer>
        <Footer.Button first onClick={switchModal}>
          Already have an account?
        </Footer.Button>
        <Footer.Close onClick={() => setModal(null)}>
          close &times;
        </Footer.Close>
      </Footer>
    </Modal>
  );
};

export default RegisterModal;

import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
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
import { LOGIN_FORM } from "../../constants";

import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";

const initialValues = {
  username: "",
  password: "",
};

const LoginModal = () => {
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState(null);

  const { login, isAuthenticated } = useAuth();
  const { setModal, isOpen } = useModal();
  const innerRef = useRef();

  const handleOnChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  const handleLogin = (e) => {
    e.preventDefault();
    const { errors, valid } = validateForm(values, LOGIN_FORM);
    if (valid) {
      login(values);
    } else {
      const firstError = Object.values(errors)[0];
      setErrorMessage(firstError);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setErrorMessage(null);
      setValues(initialValues);
      setModal(null);
    }
  }, [isAuthenticated, setModal]);

  useEffect(() => innerRef.current && innerRef.current.focus(), [isOpen]);

  return (
    <Modal setModal={setModal} isOpen={isOpen("login")} title="login">
      <Form onSubmit={handleLogin} autoComplete="off">
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
          <Label>password</Label>
          <Input
            type="password"
            name="password"
            value={values.password}
            placeholder="enter password"
            onChange={handleOnChange}
          />
        </Group>
        <Button form="true" onClick={handleLogin}>
          Login
        </Button>
        <Footer>
          <Footer.Button first>Don't have an account?</Footer.Button>
          <Footer.Button>Forgot password?</Footer.Button>
        </Footer>
      </Form>
    </Modal>
  );
};

export default LoginModal;

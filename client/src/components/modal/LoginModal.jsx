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
  const { setModal, isOpen, modal } = useModal();
  const innerRef = useRef();

  const ref = useOnclickOutside(() => {
    if (isOpen("login")) {
      setModal(null);
    }
  });

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

  const switchModal = (e) => {
    e.preventDefault();
    setModal("register");
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
    <Modal isOpen={isOpen("login")} title="login" clickedOutside={ref}>
      <Form
        onSubmit={handleLogin}
        autoComplete="off"
        onKeyDown={(e) => e.keyCode === 13 && handleLogin(e)}
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
          <Label>password</Label>
          <Input
            type="password"
            name="password"
            value={values.password}
            placeholder="enter password"
            onChange={handleOnChange}
          />
        </Group>
        <Button type="submit" form="true" onClick={handleLogin}>
          Login
        </Button>
      </Form>
      <Footer>
        <Footer.Button first onClick={switchModal}>
          Don't have an account?
        </Footer.Button>
        {/* <Footer.Button>Forgot password?</Footer.Button> */}
      </Footer>
    </Modal>
  );
};

export default LoginModal;

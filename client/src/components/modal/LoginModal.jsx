import React, { useState, useEffect, useRef } from "react";
import theme from "../../theme";
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
import { useMatch } from "../../hooks/useMatch";
import { BeatLoader } from "react-spinners";

const initialValues = {
  username: "",
  password: "",
};

const LoginModal = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState(null);

  const { login, isAuthenticated } = useAuth();
  const { setModal, isOpen, modal, setReverse, reverse } = useModal();
  const { setMatch, hasMatch } = useMatch();
  const innerRef = useRef();

  const ref = useOnclickOutside(() => {
    if (isOpen("login")) {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { errors, valid } = validateForm(values, LOGIN_FORM);
    if (valid) {
      const response = await login(values);

      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setReverse(true);
        if (hasMatch) {
          setMatch(null);
        }
        setTimeout(() => {
          setReverse(false);
        }, 600);
      }
    } else {
      const firstError = Object.values(errors)[0];
      setErrorMessage(firstError);
    }
    setLoading(false);
  };

  const switchModal = (type = "register") => {
    setModal(type);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setErrorMessage(null);
      setValues(initialValues);
    }
  }, [isAuthenticated, setModal, setReverse]);

  useEffect(() => {
    setErrorMessage(null);
    setValues(initialValues);
  }, [modal]);

  useEffect(() => innerRef.current && innerRef.current.focus(), [isOpen]);

  return (
    <Modal
      isOpen={isOpen("login")}
      reverse={reverse && "true"}
      title="login"
      clickedOutside={ref}
    >
      <Form
        onSubmit={handleLogin}
        autoComplete="off"
        onKeyDown={(e) => e.keyCode === 13 && handleLogin(e)}
      >
        <FlashMessage>
          <FlashMessage.Inner>{errorMessage}</FlashMessage.Inner>
        </FlashMessage>
        <Group auth>
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
        <Group auth>
          <Label>password</Label>
          <Input
            type="password"
            name="password"
            value={values.password}
            placeholder="enter password"
            onChange={handleOnChange}
          />
        </Group>
        <Button
          type="submit"
          form="true"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading && <BeatLoader color={theme.secondary} height="100%" />}
          {!loading && "login"}
        </Button>
      </Form>
      <Footer>
        <Footer.Button first onClick={() => switchModal()}>
          Don't have an account?
        </Footer.Button>
        <Footer.Button onClick={() => switchModal("forgotPassword")}>
          Forgot password?
        </Footer.Button>
        <Footer.Close onClick={() => setModal(null)}>
          close &times;
        </Footer.Close>
      </Footer>
    </Modal>
  );
};

export default LoginModal;

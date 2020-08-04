import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import { Form, Input, Label, Group, Footer } from "../styles/Form";
import { Button } from "../../GlobalStyles";

import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";

const initialValues = {
  username: "",
  password: "",
};

const LoginModal = () => {
  const [values, setValues] = useState(initialValues);

  const auth = useAuth();
  const { setModal, isOpen } = useModal();
  const innerRef = useRef();

  const handleOnChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(values);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      setValues(initialValues);
      setModal(null);
    }
    auth.isAuthenticated && setModal(null);
  }, [auth.isAuthenticated, setModal]);
  useEffect(() => innerRef.current && innerRef.current.focus(), [isOpen]);

  return (
    <Modal setModal={setModal} isOpen={isOpen("login")} title="login">
      <Form>
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

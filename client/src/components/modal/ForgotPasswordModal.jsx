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
import { toast } from "react-toastify";
import makeRequest from "../../helpers/makeRequest";

async function fetchPasswordReset(email) {
  return makeRequest(`/api/user/reset_password/?email=${email}`);
}

const initialValues = {
  email: "",
};

const ForgotPasswordModal = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errorMessage] = useState(null);

  const { setModal, isOpen, setReverse, reverse } = useModal();
  const innerRef = useRef();

  const ref = useOnclickOutside(() => {
    if (isOpen("forgotPassword")) {
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

  async function onSubmit(e) {
    e.preventDefault();

    if (!values.email) return;
    setLoading(true);

    const { status } = await fetchPasswordReset(values.email).catch((_) =>
      toast.error("Something went wrong on our end...")
    );

    setLoading(false);

    if (status !== 200) toast.error("No account found with the provided email");
    else {
      toast.info("Email sent to reset your password. Please check your inbox!");
      setModal(null);
      setValues(initialValues);
    }
  }

  useEffect(() => innerRef.current && innerRef.current.focus(), [isOpen]);

  return (
    <Modal
      isOpen={isOpen("forgotPassword")}
      title="Forgot Password"
      clickedOutside={ref}
      reverse={reverse}
    >
      <Form onSubmit={onSubmit} autoComplete="off">
        <FlashMessage>
          <FlashMessage.Inner>{errorMessage}</FlashMessage.Inner>
        </FlashMessage>
        <Group auth>
          <Label>Email Address</Label>
          <Input
            type="text"
            name="email"
            value={values.email}
            placeholder="Enter your email..."
            ref={innerRef}
            onChange={handleOnChange}
          />
        </Group>
        <Button onClick={onSubmit} type="submit" form="true" disabled={loading}>
          {loading && <BeatLoader color={theme.secondary} height="100%" />}
          {!loading && "Request password reset"}
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

export default ForgotPasswordModal;

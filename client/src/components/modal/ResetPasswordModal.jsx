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
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "../../GlobalStyles";
import { BeatLoader } from "react-spinners";
import theme from "../../theme";
import { useModal } from "../../hooks/useModal";
import { toast } from "react-toastify";
import makeRequest from "../../helpers/makeRequest";
import validateForm from "../../helpers/validateForm";
import { CHANGE_PASSWORD_FORM } from "../../constants";

async function fetchChangePassword(token, credentials) {
  return makeRequest(`/api/user/reset_password`, {
    method: "PATCH",
    body: JSON.stringify({ token, ...credentials }),
  });
}

const initialValues = {
  password: "",
  password_confirmation: "",
};

const ResetPasswordModal = () => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState(null);

  const { setModal, isOpen, setReverse, reverse } = useModal();
  const innerRef = useRef();

  const ref = useOnclickOutside(() => {
    if (isOpen("resetPassword")) {
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

    const { errors, valid } = validateForm(values, CHANGE_PASSWORD_FORM);

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (valid) {
      setLoading(true);

      const { status } = await fetchChangePassword(token, values).catch((err) =>
        toast.error("Something went wrong on our end...")
      );

      if (status !== 201) {
        toast.error("Could not change the current password.");
      } else {
        toast.info("Successfully changed your password.");
      }

      setModal(null);
      history.push("/");
    } else {
      const firstError = Object.values(errors)[0];
      setErrorMessage(firstError);
    }

    setLoading(false);
  }

  useEffect(() => innerRef.current && innerRef.current.focus(), [isOpen]);

  return (
    <Modal
      isOpen={isOpen("resetPassword")}
      title="Change Password"
      clickedOutside={ref}
      reverse={reverse}
    >
      <Form
        autoComplete="off"
        onKeyDown={(e) => e.keyCode === 13 && onSubmit(e)}
      >
        <FlashMessage>
          <FlashMessage.Inner>{errorMessage}</FlashMessage.Inner>
        </FlashMessage>
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
        <Group auth>
          <Label>retype password</Label>
          <Input
            type="password"
            name="password_confirmation"
            value={values.password_confirmation}
            placeholder="enter password"
            onChange={handleOnChange}
          />
        </Group>
        <Button onClick={onSubmit} type="submit" form="true" disabled={loading}>
          {loading && <BeatLoader color={theme.secondary} height="100%" />}
          {!loading && "Change Password"}
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

export default ResetPasswordModal;

import React, { useState, useRef, useLayoutEffect } from "react";
import * as SC from "./Settings.styles";
import { Button } from "../../GlobalStyles";
import Dropdown, { Menu } from "../../components/dropdown/Dropdown";
import { useDropdown } from "../../hooks/useDropdown";
import { useInput } from "../../hooks/useInput";
import { FaTrash } from "react-icons/fa";
import { API } from "../../api";
import validateForm from "../../helpers/validateForm";
import { CHANGE_PASSWORD_FORM } from "../../constants";
import { toast } from "react-toastify";

const Settings = ({ me }) => {
  const ref = useRef(null);
  const { show, handleSetShow } = useDropdown();
  const [password, passwordProps, resetPassword] = useInput("");
  const [
    passwordConfirmation,
    passwordConfirmationProps,
    resetPasswordConfirmation,
  ] = useInput("");
  const [lockPassword, setLockPassword] = useState(true);

  useLayoutEffect(() => {
    if (!lockPassword) {
      ref.current.focus();
    }
  }, [lockPassword]);

  const handleSavePassword = async () => {
    // validation
    const { errors } = validateForm(
      { password, password_confirmation: passwordConfirmation },
      CHANGE_PASSWORD_FORM
    );

    if (Object.values(errors).length > 0) {
      return toast.error(Object.values(errors)[0]);
    }

    try {
      const response = await API.changePassword(password, passwordConfirmation);

      if (!response.ok) {
        toast.error("Could not change your password");
      }
      toast.info("Successfully changed your password");
    } catch (_) {
      toast.error("Could not change your password");
    }
    onCancelPassword();
  };

  const handleChangePassword = () => setLockPassword((curr) => !curr);

  const onCancelPassword = () => {
    setLockPassword(true);
    resetPassword();
    resetPasswordConfirmation();
  };

  const handleDelete = (e) => {
    console.log("delete summmoner");
  };

  const removeNumbersFromString = (str) => str.replace(/[0-9]/g, "");
  const pluralize = (length = 1, str) => (length > 1 ? str + "s" : str);

  return (
    <SC.Container>
      <SC.Container.Inner>
        <SC.Box>
          <SC.Title>Personal Information</SC.Title>
          <SC.Box className="group">
            <SC.InputGroup>
              <SC.Label htmlFor="username">Username</SC.Label>
              <SC.Input name="username" value={me.username} disabled />
            </SC.InputGroup>
            <SC.InputGroup>
              <SC.Label htmlFor="email">Email Address</SC.Label>
              <SC.Input name="email" value={me.email} disabled />
            </SC.InputGroup>
          </SC.Box>
        </SC.Box>
        <SC.Box className="password">
          <SC.Title className="password">Change Your Password</SC.Title>
          <SC.InputGroup>
            <SC.Label htmlFor="password">Password</SC.Label>
            <SC.Input
              active={!lockPassword}
              ref={ref}
              type="password"
              name="password"
              {...passwordProps}
              disabled={lockPassword}
            />
          </SC.InputGroup>
          <SC.InputGroup>
            <SC.Label htmlFor="password_confirmation">
              Re-type password
            </SC.Label>
            <SC.Input
              active={!lockPassword}
              type="password"
              name="password_confirmation"
              {...passwordConfirmationProps}
              disabled={lockPassword}
            />
          </SC.InputGroup>
          <SC.Box className="buttonGroup">
            {lockPassword && (
              <Button className="maxContent" onClick={handleChangePassword}>
                Change Password
              </Button>
            )}

            {!lockPassword && (
              <>
                <Button className="maxContent" onClick={handleSavePassword}>
                  Save Changes
                </Button>
                <Button
                  dangerv2
                  className="maxContent"
                  onClick={onCancelPassword}
                >
                  Cancel
                </Button>
              </>
            )}
          </SC.Box>
        </SC.Box>
        <SC.Box className="summoner" as="ul">
          <SC.Title className="summoner">
            Summoner {pluralize(1, "Account")}
          </SC.Title>
          <SC.Field>
            <SC.TextWrapper>
              [{removeNumbersFromString(me.summoner?.region).toUpperCase()}]
            </SC.TextWrapper>
            <SC.TextWrapper>{me.summoner?.name}</SC.TextWrapper>
            <Dropdown show={show} handleSetShow={handleSetShow} right="12px">
              <Menu.Item small onClick={handleDelete} small={false}>
                <FaTrash style={{ marginRight: ".3rem" }} />
                delete
              </Menu.Item>
            </Dropdown>
          </SC.Field>
        </SC.Box>
      </SC.Container.Inner>
    </SC.Container>
  );
};

export default Settings;

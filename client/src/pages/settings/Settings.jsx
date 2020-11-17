import React, { useRef, useLayoutEffect } from "react";
import * as SC from "./Settings.styles";
import { Button } from "../../GlobalStyles";
import Dropdown, { Menu } from "../../components/dropdown/Dropdown";
import { FaTrash } from "react-icons/fa";

const Settings = ({
  user,
  lockPassword,
  passwordProps,
  passwordConfirmationProps,
  handleChangePassword,
  handleSavePassword,
  handleDelete,
  handleSetShow,
  onCancelPassword,
  show,
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!lockPassword) {
      ref.current.focus();
    }
  }, [lockPassword]);

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
              <SC.Input name="username" value={user.username} disabled />
            </SC.InputGroup>
            <SC.InputGroup>
              <SC.Label htmlFor="email">Email Address</SC.Label>
              <SC.Input name="email" value={user.email} disabled />
            </SC.InputGroup>
          </SC.Box>
        </SC.Box>
        <SC.Box className="password">
          <SC.Title className="password">Change Your Password</SC.Title>
          <SC.InputGroup>
            <SC.Label htmlFor="password">Password</SC.Label>
            <SC.Input
              autocomplete="chrome-off"
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
              autoComplete="off"
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
          {!user.summoner && <p>You have not added a summoner account yet!</p>}
          {user.summoner && (
            <SC.Field>
              <SC.TextWrapper>
                [{removeNumbersFromString(user.summoner.region).toUpperCase()}]
              </SC.TextWrapper>
              <SC.TextWrapper>{user.summoner.name}</SC.TextWrapper>
              <Dropdown show={show} handleSetShow={handleSetShow} right="12px">
                <Menu.Item onClick={handleDelete} small={false}>
                  <FaTrash style={{ marginRight: ".3rem" }} />
                  delete
                </Menu.Item>
              </Dropdown>
            </SC.Field>
          )}
        </SC.Box>
      </SC.Container.Inner>
    </SC.Container>
  );
};

export default Settings;

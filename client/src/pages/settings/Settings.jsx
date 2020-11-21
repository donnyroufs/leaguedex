import React, { useRef, useLayoutEffect } from "react";
import * as SC from "./Settings.styles";
import Summoner from "../../components/summoner/Summoner";
import { Button } from "../../GlobalStyles";

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
              autoComplete="new-password"
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
          {user.summoner &&
            user.summoner.map((acc) => (
              <Summoner {...acc} handleDelete={handleDelete} key={acc.id} />
            ))}
        </SC.Box>
      </SC.Container.Inner>
    </SC.Container>
  );
};

export default Settings;

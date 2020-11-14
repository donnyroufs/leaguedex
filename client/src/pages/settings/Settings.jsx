import React from "react";
import * as SC from "./Settings.styles";
import { Button } from "../../GlobalStyles";
import Dropdown, { Menu } from "../../components/dropdown/Dropdown";
import { useDropdown } from "../../hooks/useDropdown";


const Settings = ({ me }) => {
  const { show, handleSetShow } = useDropdown();

  const handleDelete = (e) => {
    console.log("delete");
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
          <SC.Title className="small">Password</SC.Title>
          <Button>Change Password</Button>
        </SC.Box>
        <SC.Box className="summoner" as="ul">
          <SC.Title className="summoner">
            Summoner {pluralize(1, "Account")}
          </SC.Title>
          <SC.Field>
            <SC.TextWrapper>
              [{removeNumbersFromString(me.summoner?.region)}]
            </SC.TextWrapper>
            <SC.TextWrapper>{me.summoner?.name}</SC.TextWrapper>
            <Dropdown show={show} handleSetShow={handleSetShow} right="12px">
              <Menu.Item small onClick={handleDelete}>
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
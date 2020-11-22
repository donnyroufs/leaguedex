import React from "react";
import Dropdown, { Menu } from "../../components/dropdown/Dropdown";
import { FaTrash } from "react-icons/fa";
import * as SC from "./Summoner.styles";
import { useDropdown } from "../../hooks/useDropdown";
import { removeNumbersFromString } from "../../helpers/utils";

const Summoner = ({ id, name, region, handleDelete }) => {
  const { show, handleSetShow } = useDropdown();

  const onDelete = () => {
    handleDelete(id);
  };

  return (
    <SC.Field>
      <SC.TextWrapper>
        [{removeNumbersFromString(region).toUpperCase()}]
      </SC.TextWrapper>
      <SC.TextWrapper>{name}</SC.TextWrapper>
      <Dropdown show={show} handleSetShow={handleSetShow} right="12px">
        <Menu.Item onClick={onDelete} small={false}>
          <FaTrash style={{ marginRight: ".3rem" }} />
          delete
        </Menu.Item>
      </Dropdown>
    </SC.Field>
  );
};

export default Summoner;

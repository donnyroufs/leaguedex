import React from "react";
import { FaEllipsisV, FaTrash } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  right: 32px;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 6px;
`;

const Menu = styled.ul`
  position: absolute;
  top: -72px;
  margin: 0;
  list-style: none;
  padding: 0;
  left: -96px;
  box-shadow: 0px 4px 8px -4px rgba(18, 31, 46, 0.62);
  @media screen and (min-width: 968px) {
    left: 0;
  }
`;

Menu.Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.3rem;
  background: #18222f;
  transition: all 0.1s ease-in;
  &:hover {
    background: #d64c3e;
  }
`;

const Button = styled(FaEllipsisV)``;

const Dropdown = ({ show, handleSetShow, id, deleteNote }) => {
  return (
    <Container onClick={() => handleSetShow(id)}>
      <Button />
      <Menu>
        {show === id && (
          <Menu.Item onClick={(e) => deleteNote(e, id)}>
            <FaTrash style={{ marginRight: ".3rem" }} />
            Delete
          </Menu.Item>
        )}
      </Menu>
    </Container>
  );
};

export default Dropdown;

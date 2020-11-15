import React from "react";
import { FaEllipsisV, FaTrash } from "react-icons/fa";
import styled, { css } from "styled-components";

const Container = styled.div`
  position: absolute;
  top: ${(props) => (props.small ? "55%" : "50%")};
  right: 32px;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 6px;

  ${(props) =>
    props.small &&
    css`
      right: 0;
    `}
`;

export const Menu = styled.ul`
  position: absolute;
  top: ${(props) => (props.small ? "-62px" : "-72px")};
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
    background: ${(props) => (props.small ? "inerhit" : "#d64c3e")};
    color: #fff;
  }

  font-size: ${(props) => (props.small ? ".9rem" : "1rem")};
`;

const Button = styled(FaEllipsisV)``;

const Dropdown = ({
  children,
  show,
  handleSetShow,
  id,
  deleteNote,
  w,
  right = 0,
}) => {
  return (
    <Container
      onClick={() => handleSetShow(id)}
      small={!!children}
      w={w}
      style={{ right }}
    >
      <Button />
      {show === id && (
        <Menu small={!!children}>
          {children}
          {!children && (
            <Menu.Item onClick={(e) => deleteNote(e, id)}>
              <FaTrash style={{ marginRight: ".3rem" }} />
              Delete
            </Menu.Item>
          )}
        </Menu>
      )}
    </Container>
  );
};

export default Dropdown;

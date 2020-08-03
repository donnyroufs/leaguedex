import styled, { createGlobalStyle, css } from "styled-components";
import { normalize } from "styled-normalize";
import { Link } from "react-router-dom";

export const utils = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export const Button = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.85rem 1.1rem;
  background: ${(props) => props.theme.primary};
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  font-size: 0.9rem;

  ${(props) =>
    props.secondary &&
    css`
      background: ${(props) => props.theme.secondaryButton};
    `}

  ${(props) =>
    props.menu &&
    css`
      width: 47.5%;
    `}

  &:hover {
    opacity: 0.8;
  }
`;

export default createGlobalStyle`
    ${normalize}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
      width: 100%;
      background-color: ${(props) => props.theme.background};
      color: ${(props) => props.theme.third};
      font-family: 'Poppins', sans-serif;
    }

    .searchbar-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }

    textarea:focus, input:focus{
      outline: none;
    }
`;

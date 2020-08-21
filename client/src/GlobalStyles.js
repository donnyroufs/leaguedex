import styled, { createGlobalStyle, css, keyframes } from "styled-components";
import { normalize } from "styled-normalize";
import { Link as ReactLink } from "react-router-dom";

export const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeAnimationOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const scaleAnimation = keyframes`
  from {
    transform: scale(0.3);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const scaleAnimationOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.3);
    opacity: 0;
  }
`;
// fade-and-slide-in

const GenericButton = css`
  outline: none;
  border: none;
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
  cursor: pointer;

  ${(props) =>
    props.secondary &&
    css`
      background: ${(props) => props.theme.secondaryButton};
    `}

  ${(props) =>
    props.menu &&
    css`
      width: 48.5%;
    `}

  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.form &&
    css`
      margin-top: 2rem;
      width: 100%;
    `}

  ${(props) =>
    props.logout &&
    css`
      color: #83a2c5;
      background: #232f3e;
    `}
    
  ${(props) =>
    props.aboveAverage &&
    css`
      background-color: #e66e28;
      color: #52270e;
    `}
`;

export const utils = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export const Link = styled(ReactLink)`
  ${GenericButton}

  ${(props) =>
    props.aboveAverage &&
    css`
      background-color: #e66e28;
      color: #52270e;
    `}
`;

export const Button = styled.button`
  ${GenericButton}

  ${(props) =>
    props.header &&
    css`
      margin-left: 1.25rem;
      min-width: 150px;
      max-height: 43px;
    `}

    ${(props) =>
      props.danger &&
      css`
        background: #d23f6f;
        color: #1b0009;
      `}
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
      padding-bottom: calc(100px + 3rem);

      @media screen and (min-width: 1200px) {
        padding-bottom: 0;
      }
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

    .fade-and-slide-in-enter {
      transform: translateX(-32px);
      opacity: 0.01;
      transition: all 200 ease-in;
    }

    .fade-and-slide-in-enter.fade-and-slide-in-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: all 400ms ease-in;
    }

    .fade-and-slide-in-leave {
      transform: translateX(0);
      opacity: 1;
    }

    .fade-and-sline-in-leave.fade-and-slide-in-leave-active {
      transform: translateX(-32px);
      opacity: 0.01;
    }
`;

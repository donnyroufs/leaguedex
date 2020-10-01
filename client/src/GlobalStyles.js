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
      margin-left: 1rem;
    `}

  ${(props) =>
    props.marginRight &&
    css`
      margin-right: ${(props) => props.marginRight};
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

    ${(props) =>
    props["hide-xs"] &&
    css`
      display: none;
      @media screen and (min-width: 968px) {
        display: flex;
      }
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

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      border: none !important;
      -webkit-text-fill-color: #B8D0EC !important;
      -webkit-box-shadow: 0 0 0px 1000px #27303a inset !important;
      box-shadow: 0 0 0px 1000px #27303a inset !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }
   
    .fade-enter {
      opacity: 0;
      transform: scale(0.9);
    }

    .fade-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 300ms, transform 300ms;
    }

    .fade-exit {
      opacity: 1;
    }

    .fade-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 300ms, transform 300ms;
    }

    input:-internal-autofill-selected {
      background-color: transparent !important;
    }
    

    .clipboard {
      font-size: 1rem;
      cursor: pointer;
      margin-right: .3rem;
      margin-bottom: .15rem;

      @media screen and (min-width: 1200px) {
        margin-right: .66rem;
      }
    }
    .Toastify__toast-container {
      z-index: 9999999999;
    }

    .highlightNote {
       color: ${(props) => props.theme.primary};
       background: transparent;
    }
`;

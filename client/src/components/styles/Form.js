import styled, { css } from "styled-components";

export const FlashMessage = styled.div`
  height: 32px;
  width: 100%;
`;

FlashMessage.Inner = styled.span`
  display: flex;
  justify-content: flex-end;
  color: ${(props) => props.theme.danger};
`;

export const Form = styled.form`
  width: 80%;
  max-width: 500px;
  ${(props) =>
    props.champion &&
    css`
      width: 100%;
      max-width: 968px;
    `}

  ${(props) =>
    props.secondary &&
    css`
      width: 100%;
      padding: 0 1.5rem;
    `}

  @media screen and (min-width: 968px) {
    width: 100%;

    ${(props) =>
      props.champion &&
      css`
        display: flex;
        align-items: center;
        width: auto;
      `}

    ${(props) =>
      props.secondary &&
      css`
        padding: 0;
        max-width: 100%;
      `}

    ${(props) =>
      props.tweak &&
      css`
        padding: 0 1.5rem;
      `}
  }

  @media screen and (min-width: 1200px) {
    ${(props) =>
      props.tweak &&
      css`
        padding: 0;
      `}
  }
`;

export const Group = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background: ${(props) => props.theme.dark};
  height: 70px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: ${(props) => (props.home ? "100%" : "auto")};

  ${(props) =>
    props.champion &&
    css`
      margin-top: 0.3rem;
      background: #23303f;
      margin-top: 2rem;
      width: 100%;

      @media screen and (min-width: 968px) {
        margin-bottom: 0;
        margin-top: 0;
        min-width: 350px;
        border-radius: 6px;
        height: 80px;
        min-width: 320px;
        max-width: 400px;
      }
    `}

  ${(props) =>
    props.secondary &&
    css`
      transition: 0.3s ease-in-out all;
      opacity: 0.4;
      margin-top: 2rem;
      margin-bottom: 0;
      width: 100%;
      background: #2c3a4a;
      text-align: left;
      cursor: text;
      &:hover {
        opacity: 1;
      }

      &:focus-within {
        opacity: 1;
      }
    `}
`;
export const Label = styled.label`
  ${({ home }) => css`
    margin-bottom: ${home ? 0.5 : 0.3}rem;
  `}

  font-weight: bold;
  font-size: 14px;
  margin-left: 0.1rem;
  cursor: text;
  padding: 0 1rem;
`;

export const Select = styled.select`
  background: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.secondary};
  margin-left: -2px;
  padding: 0 1rem;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.secondary};
  padding: 0 1rem;
  ${(props) =>
    props.secondary &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.champion &&
    css`
      margin-top: 0.3rem;
    `}

  ::placeholder {
    text-transform: uppercase;
    color: ${(props) =>
      props.secondary ? "#7A8DA5" : props.theme.placeholderFormText};
    opacity: 1;
    font-weight: bold;
  }

  :-ms-input-placeholder {
    text-transform: uppercase;
    color: ${(props) =>
      props.secondary ? "#7A8DA5" : props.theme.placeholderFormText};
    font-weight: bold;
  }

  ::-ms-input-placeholder {
    text-transform: uppercase;
    color: ${(props) =>
      props.secondary ? "#7A8DA5" : props.theme.placeholderFormText};
    font-weight: bold;
  }
`;

export const Footer = styled.footer`
  display: flex;
  width: 100%;
  align-items: flex-end;
  flex-flow: column nowrap;
  font-size: 0.9rem;
  max-width: 500px;
  width: 80%;

  @media screen and (min-width: 968px) {
    width: 100%;
  }
`;

Footer.Button = styled.button`
  outline: none;
  border: none;
  display: block;
  background: transparent;
  margin-top: 0.25rem;
  color: ${(props) => props.theme.third};
  transition: 0.1s ease-in-out all;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.first &&
    css`
      margin-top: 1rem;
    `}
`;

Footer.Close = styled.button`
  outline: none;
  border: none;
  display: block;
  background: transparent;
  margin-top: 0.25rem;
  color: ${(props) => props.theme.third};
  transition: 0.1s ease-in-out all;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.first &&
    css`
      margin-top: 1rem;
    `}

  @media screen and (min-width: 968px) {
    display: none;
  }
`;

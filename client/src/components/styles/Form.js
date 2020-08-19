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

  @media screen and (min-width: 968px) {
    width: 100%;

    ${(props) =>
      props.secondary &&
      css`
        max-width: 100%;
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
  padding: 0 1rem;
  margin-bottom: 1rem;

  ${(props) =>
    props.secondary &&
    css`
      transition: 0.3s ease-in-out all;
      opacity: 0.4;
      margin-top: 2rem;
      margin-bottom: 0;
      width: 100%;
      background: #2c3a4a;
      cursor: text;
      &:hover {
        opacity: 1;
      }
    `}
`;
export const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 0.3rem;
  margin-left: 0.1rem;
  cursor: text;
`;
export const Input = styled.input`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.secondary};
  ${(props) =>
    props.secondary &&
    css`
      width: 100%;
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

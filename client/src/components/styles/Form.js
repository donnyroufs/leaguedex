import styled, { css } from "styled-components";

export const Form = styled.form`
  width: 80%;
  max-width: 500px;

  @media screen and (min-width: 968px) {
    width: 100%;
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
`;
export const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 0.3rem;
  margin-left: 0.1rem;
`;
export const Input = styled.input`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.secondary};
  ::placeholder {
    text-transform: uppercase;
    color: ${(props) => props.theme.placeholderFormText};
    opacity: 1;
    font-weight: bold;
  }

  :-ms-input-placeholder {
    text-transform: uppercase;
    color: ${(props) => props.theme.placeholderFormText};
    font-weight: bold;
  }

  ::-ms-input-placeholder {
    text-transform: uppercase;
    color: ${(props) => props.theme.placeholderFormText};
    font-weight: bold;
  }
`;

export const Footer = styled.footer`
  display: flex;
  width: 100%;
  align-items: flex-end;
  flex-flow: column nowrap;
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

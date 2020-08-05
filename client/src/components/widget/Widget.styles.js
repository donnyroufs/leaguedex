import styled, { css } from "styled-components";
import { utils } from "../../GlobalStyles";

export const Container = styled.div`
  ${utils.flexCenter}
  flex-flow: column nowrap;
  background: ${(props) => props.theme.header};
  border: 1px solid ${(props) => props.theme.border};
  width: 100%;
  height: 175px;
  margin-top: 3rem;

  @media screen and (min-width: 968px) {
    width: 34%;

    ${(props) =>
      props.matchup &&
      css`
        width: 62%;
      `}
  }
`;

export const Wrapper = styled.div`
  min-width: 80%;
  max-width: 80%;
`;

Container.Title = styled.h2`
  color: ${(props) => props.theme.primary};
  margin: 0 0 1.5rem 0;
`;

Container.Body = styled.div``;

export const Text = styled.p`
  padding: 0;
  margin: 0.5rem 0;
  font-size: 1rem;
`;

export const Input = styled.input`
  border: 1px solid ${(props) => props.theme.border};
  background: transparent;
  padding: 0.5rem 0.8rem;
  color: ${(props) => props.theme.third};
  width: 100%;

  ::placeholder {
    color: ${(props) => props.theme.placeholderText};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${(props) => props.theme.placeholderText};
  }

  ::-ms-input-placeholder {
    color: ${(props) => props.theme.placeholderText};
  }

  @media screen and (min-width: 968px) {
    padding: 0.7rem 0.8rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

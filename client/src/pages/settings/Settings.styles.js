import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  margin-bottom: 8rem;

  @media screen and (min-width: 968px) {
    height: calc(100vh - 175px);
  }
`;

Container.Inner = styled.div`
  width: 80%;
  margin: 0 auto;

  @media screen and (min-width: 1365px) {
    width: 60%;
  }

  @media screen and (min-width: 1600px) {
    width: 35%;
  }
`;

export const Box = styled.div`
  &.group {
    margin: 3rem 0 2rem 0;
  }

  &.password {
    display: flex;
    flex-flow: column nowrap;
    padding: 3rem 0;
    border-top: 1px solid #263547;
    border-bottom: 1px solid #263547;
  }

  &.summoner {
    margin: 0;
    padding: 3rem 0;
    list-style: none;
  }

  &.buttonGroup {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: 1.1rem;
  margin: 0;

  &.small {
    font-size: 0.95rem;
  }

  &.summoner,
  &.password {
    margin-bottom: 3rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const Label = styled.label`
  margin: 0 0 1rem 0;
`;

export const Input = styled.input`
  padding: 1.25rem 1.5rem;
  margin-bottom: 2.5rem;
  outline: none;
  border: none;
  border-radius: 0.3em;
  color: ${({ theme }) => theme.placeholderText};
  background: ${({ theme }) => theme.header};
  ${(props) =>
    props.active &&
    css`
      border: 1px solid ${props.theme.primary};
    `}
`;

export const Field = styled.li`
  position: relative;
  padding: 1.25rem 1.5rem;
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.placeholderText};
  background: ${({ theme }) => theme.header};
  margin: 0 0 1.25rem 0;
`;

export const TextWrapper = styled.span`
  margin-right: 0.5rem;
`;

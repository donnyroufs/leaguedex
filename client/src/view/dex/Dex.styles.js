import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  width: 80%;
  margin: 0 auto;
  max-width: 1400px;
  height: calc(100vh - 170px);

  @media screen and (min-width: 1200px) {
    flex-flow: row nowrap;
  }
`;

Container.Left = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 6;
`;

Container.Right = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 8;

  @media screen and (min-width: 1200px) {
    margin-left: 100px;
  }

  @media screen and (min-width: 1400px) {
    margin-left: 200px;
  }
`;

export const Header = styled.header`
  height: 200px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 500px) {
    flex-flow: row wrap;
  }

  @media screen and (min-width: 1200px) {
    height: 100px;
    min-height: 100px;
    flex-flow: row nowrap;
  }
`;

Header.Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

Header.Right = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: 1200px) {
    justify-content: flex-end;
  }

  ${(props) =>
    props.type === "stats" &&
    css`
      display: flex;
      flex-flow: column nowrap;
    `}
`;

export const Status = styled.div`
  display: none;

  @media screen and (min-width: 1200px) {
    display: flex;
    background: ${({ theme }) => theme.primary};
    border-radius: 6px;
    padding: 0.8rem 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: bold;
    font-size: 0.95rem;
    text-transform: uppercase;
    margin-right: 1rem;
  }

  @media screen and (min-width: 1600px) {
    margin-right: 2rem;
  }
`;

export const Text = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;

  @media screen and (min-width: 968px) {
    font-size: 1rem;
  }

  @media screen and (min-width: 1200px) {
    font-size: 0.9rem;
  }

  @media screen and (min-width: 1400px) {
    font-size: 1.1rem;
  }

  ${(props) =>
    props.type === "runes" &&
    css`
      background: #18222f;
      text-transform: none;
      font-size: 1rem;
      font-weight: normal;
      padding: 2rem;
      border-radius: 6px;
    `}
`;

export const Highlight = styled.mark`
  background: none;
  color: #3f8be4;
  font-weight: bold;
  font-size: 1rem;
  padding: 0 0.4rem;
`;

export const Runes = styled.section`
  display: flex;
  flex-flow: column nowrap;
  pointer-events: none;
  margin-top: 4rem;

  @media screen and (min-width: 968px) {
    margin-top: 6rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
`;

export const Notes = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 4rem;

  @media screen and (min-width: 968px) {
    margin-top: 6rem;
  }
`;

import { Link as ReactLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  width: 80%;
  max-width: 1400px;
`;

Container.Body = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
  border-radius: 6px;
  min-height: 200px;

  table {
    margin-top: ${(props) => (props.mt ? props.mt : 0)};
    border-collapse: collapse;
    min-width: 600px;
    width: 100%;
    color: ${(props) => props.theme.secondary};
  }

  thead {
    color: #fff;
    border-bottom: 20px solid ${(props) => props.theme.background};
  }

  thead > tr {
    height: 80px;
    background: ${(props) => props.theme.primary};
  }

  tbody > tr {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  /* tbody > tr:nth-child(even) {
    background: #293748;
  } */

  tbody > tr:hover {
    /* background: #3a4d65; */
    background: #293748;
  }

  tr {
    height: 64px;
    border-bottom: 3px solid ${(props) => props.theme.background};
    background: #232f3e;
  }

  td {
    text-align: center;
  }
`;

export const Box = styled.div`
  ${(props) =>
    props.flex &&
    css`
      display: flex;
    `}

  margin-left: ${(props) => (props.ml ? props.ml : 0)};
`;

export const Heading = styled.h1`
  text-transform: capitalize;
  margin-bottom: 0;
`;

export const SubTitle = styled.p`
  margin-top: 0.5rem;
  text-transform: capitalize;
`;

export const Unbold = styled.span`
  font-weight: 400;
`;

export const Image = styled.img``;
export const Link = styled(ReactLink)`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  text-decoration: none;

  transition: opacity 0.1s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

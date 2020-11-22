import styled, { css } from "styled-components";
import { NavLink as ReactLink } from "react-router-dom";

export const Wrapper = styled.aside`
  position: fixed;
  z-index: 99999999;
  display: flex;
  height: 100vh;
  width: 100%;
  top: 100px;
  transform: translateX(-100vw);
  background: ${(props) => props.theme.header};
  transition: all 0.2s ease-in-out;
  justify-content: center;
  ${(props) =>
    props.isOpen &&
    css`
      transform: translateX(0);
    `}

  @media screen and (min-width: 968px) {
    height: calc(100vh - 175px);
    top: 175px;
    width: 375px;
  }
`;

export const Heading = styled.h1`
  font-size: 12px;
  font-weight: 1000;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${(props) => props.theme.secondary};
  border-bottom: 1px solid #263547;
  padding-bottom: 0.75rem;
  margin-bottom: 2rem;
  margin-top: 4rem;

  @media screen and (max-height: 568px) {
    margin-top: 1rem;
  }
`;

Wrapper.Inner = styled.div`
  width: 80%;

  @media screen and (min-width: 968px) {
    width: 66%;
    margin-top: 2.25rem;
  }

  @media screen and (min-height: 768px) and (max-height: 968px) {
    margin-top: 0.5rem;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const Link = styled(ReactLink)`
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${(props) => props.theme.secondary};
  margin-bottom: 2rem;

  opacity: 0.4;

  &.active-route {
    opacity: 1;
  }
`;

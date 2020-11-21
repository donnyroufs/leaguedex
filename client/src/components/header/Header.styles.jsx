import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  ${({ theme }) => css`
    background: ${theme.header};
  `}

  display: flex;
  flex-flow: column nowrap;
  height: 100px;

  @media screen and (min-width: 968px) {
    position: fixed;
    top: 0;
    z-index: 10000;
    left: 0;
    height: 175px;
    width: 100%;
  }
`;

Container.Inner = styled.div`
  width: 80%;
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
`;

Container.Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

Container.Brand = styled(Link)`
  margin: 0 0 0 0.6rem;
`;

Container.Brand.Image = styled.img``;

Container.Buttons = styled.div`
  display: none;
  @media screen and (min-width: 968px) {
    display: flex;
  }
`;

export const LinkIcon = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.secondary};
  `}

  margin-right: 1rem;
  transition: opacity 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

LinkIcon.External = styled.a`
  ${({ theme }) => css`
    color: ${theme.secondary};
  `}

  margin-right: 1rem;
  transition: opacity 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Hamburger = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1.25rem;
`;

import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  ${({ theme }) => css`
    background: ${theme.header};
  `}

  display: flex;
  flex-flow: column nowrap;
  height: 175px;
`;

Container.Inner = styled.div`
  width: 80%;
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;

  @media screen and(min-width: 1200px) {
    width: 100%;
  }
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

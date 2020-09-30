import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  ${({ theme }) => css`
    background: ${theme.header};
  `}

  display: flex;
  flex-flow: column nowrap;
`;

Container.Inner = styled.div`
  width: 80%;
  max-width: 1400px;
  margin: 0 auto;

  @media screen and(min-width: 1200px) {
    width: 100%;
  }
`;

Container.Bottom = styled.div`
  display: flex;
`;

Container.Brand = styled(Link)`
  margin: 0;
`;

Container.Brand.Image = styled.img``;

Container.Buttons = styled.div`
  display: none;
  @media screen and (min-width: 968px) {
    display: flex;
  }
`;

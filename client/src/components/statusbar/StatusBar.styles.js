import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.primary};
  `}
  color: #fff;
  padding: 1rem;
`;

Container.Inner = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 80%;
  max-width: 1400px;
  @media screen and(min-width: 1200px) {
    width: 100%;
  }
`;

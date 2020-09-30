import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.primary};
  `}
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 1rem;
`;

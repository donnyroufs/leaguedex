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

Container.Status = styled.div``;

Container.Actions = styled.div``;

export const Button = styled.button`
  ${({ secondary }) => css`
    font-weight: ${secondary ? "normal" : "bold"};
    opacity: ${secondary ? 0.7 : 1};
  `}

  margin-left: 1rem;
  cursor: pointer;
  background: none;
  color: #fff;
  outline: none;
  border: 0;
  transition: opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;

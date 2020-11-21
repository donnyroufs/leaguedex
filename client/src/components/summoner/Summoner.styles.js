import styled from "styled-components";

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

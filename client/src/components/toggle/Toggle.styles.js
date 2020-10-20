import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  background: #18222f;
  border-radius: 4px;
`;

Container.Option = styled.div`
  border-radius: 4px;
  transition: all 0.1s ease-in-out;
  padding: 0.8rem 1rem;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      background: ${(props) => props.theme.primary};
      color: #fff;
    `}
`;

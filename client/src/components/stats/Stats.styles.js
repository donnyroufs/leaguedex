import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ home }) => css`
    height: ${home ? 80 : 120}px;
    background: #23303f;
    margin-right: ${home ? 1 : 0}rem;

    @media screen and(min-width: 968px) {
      margin-left: ${home ? 1 : 0}rem;
      margin-right: 0;
    }
  `}

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 0 1.5rem;
`;

Container.Label = styled.h3`
  ${({ home }) => css`
    font-size: ${home ? 0.8 : 1}rem;
  `}
  font-weight: 300;
  color: ${(props) => props.theme.secondary};
  opacity: 0.5;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`;

Container.Info = styled.p`
  ${({ home }) => css`
    font-size: ${home ? 1.5 : 2}rem;
  `}
  padding: 0;
  margin: 0.3rem 0;
  text-transform: uppercase;
  font-weight: bold;
`;

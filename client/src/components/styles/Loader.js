import styled, { css } from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(50, 63, 78, 1);
  display: flex;
  justify-content: center;
  transition: opacity 0.5s ease-in-out 0.35s;
  align-items: center;
  pointer-events: none;
  z-index: 9000;
  opacity: ${(props) => props.hide && 0};

  ${(props) =>
    props.secondary &&
    css`
      top: 100px;
      height: calc(100vh - 100px);
      background: transparent;
    `}
`;

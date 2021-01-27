import styled, { css } from "styled-components";
import { scaleAnimation, scaleAnimationOut } from "../../GlobalStyles";

export const Container = styled.div`
  display: flex;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (!props.isOpen ? "none" : "auto")};
  z-index: ${(props) => (props.isOpen ? 50 : -1)};
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10001;
  background: rgba(27, 39, 53, 0.75);
  justify-content: center;
  align-items: center;
`;

Container.Inner = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  background: ${(props) => props.theme.modal};
  height: 100%;
  width: 100%;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.reverse
      ? css`
          animation: ${scaleAnimationOut} 0.75s forwards
            cubic-bezier(0.075, 0.82, 0.165, 1);
        `
      : css`
          animation: ${scaleAnimation} 0.75s forwards
            cubic-bezier(0.65, 0, 0.32, 1.55);
        `}

  @media screen and (min-width: 968px) {
    height: ${(props) => (props.register ? "700px" : "550px")};
    width: 800px;
  }
`;

Container.Header = styled.header`
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 2.7rem;
  text-transform: uppercase;
`;

export const InfoBox = styled.div`
  overflow: auto;
  padding: 0rem 4rem 1.5rem 4rem;
`;

InfoBox.List = styled.ol`
  padding: 0 3rem;
`;

InfoBox.Item = styled.li`
  margin: 0 0 2rem 0;
`;

InfoBox.Footer = styled.footer`
  display: flex;
  width: 100%;
`;

InfoBox.Close = styled.button`
  outline: none;
  border: none;
  margin-left: auto;
  background: none;
  color: ${({ theme }) => theme.secondary};

  &:hover {
    cursor: pointer;
  }
`;

import styled from "styled-components";
import { scaleAnimation, fadeAnimation } from "../../GlobalStyles";

export const Container = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 50;
  background: rgba(27, 39, 53, 0.75);
  justify-content: center;
  align-items: center;
  animation: ${fadeAnimation} 0.35s forwards cubic-bezier(0.65, 0, 0.32, 1.55);
`;

Container.Inner = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  background: ${(props) => props.theme.modal};
  height: 100%;
  width: 100%;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  animation: ${scaleAnimation} 0.75s forwards cubic-bezier(0.65, 0, 0.32, 1.55);

  @media screen and (min-width: 968px) {
    height: ${(props) => (props.register ? "650px" : "550px")};
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

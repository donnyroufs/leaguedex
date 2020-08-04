import styled from "styled-components";

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
`;
Container.Inner = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  background: ${(props) => props.theme.modal};
  height: 100%;
  width: 100%;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 968px) {
    height: 550px;
    width: 800px;
  }
`;

Container.Header = styled.header`
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 2.7rem;
  text-transform: uppercase;
`;

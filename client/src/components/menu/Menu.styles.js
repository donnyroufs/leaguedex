import styled from "styled-components";

export const Container = styled.div`
  display: ${(props) => (props.isOpen ? "none" : "flex")};
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  justify-content: spac-between;
  align-items: center;
  background: ${(props) => props.theme.header};
  z-index: 100;

  @media screen and (min-width: 968px) {
    display: none;
  }
`;

Container.Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 2rem;
`;

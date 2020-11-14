import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  @media screen and (min-width: 968px) {
    margin-top: -100px;
    height: calc(100vh - 175px);
  }
`;

Container.Inner = styled.div`
  width: 80%;
  margin: 0 auto;
`;

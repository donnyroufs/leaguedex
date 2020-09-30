import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  max-width: 1400px;
  width: 80%;

  @media screen and (min-width: 968px) {
    margin: 0 auto;
    width: 100%;
  }
`;

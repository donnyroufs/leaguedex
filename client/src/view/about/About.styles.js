import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  max-width: 900px;
  width: 80%;
  margin: 0 auto;

  @media screen and (min-width: 968px) {
    width: 100%;
  }
`;

export const ImageWrapper = styled.div`
  height: 300px;
  width: 100%;

  @media screen and (min-width: 968px) {
    height: 500px !important;
  }
`;

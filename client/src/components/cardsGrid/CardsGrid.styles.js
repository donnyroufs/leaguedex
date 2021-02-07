import styled from "styled-components";

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  margin: 3rem 0;

  @media screen and (min-width: 968px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

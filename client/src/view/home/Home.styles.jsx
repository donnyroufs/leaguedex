import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  width: 80%;
  margin: 0 auto;
  max-width: 1400px;

  ${(props) =>
    props.secondary &&
    css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      width: 100%;
      margin-top: 3rem;

      @media screen and (min-width: 968px) {
        grid-template-columns: repeat(4, 1fr);
      }

      @media screen and (min-width: 1200px) {
        grid-template-columns: repeat(6, 1fr);
      }
    `}
`;

Container.Widgets = styled.div`
  width: 100%;
  min-height: 80px;
  @media screen and (min-width: 968px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const Widget = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (min-width: 968px) {
    justify-content: flex-start;
    width: auto;
  }
`;

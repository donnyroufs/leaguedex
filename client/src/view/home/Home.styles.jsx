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
      width: 100%;
      margin-top: 3rem;

      @media screen and (min-width: 968px) {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
      }
    `}
`;

Container.Widgets = styled.div`
  width: 100%;
  @media screen and (min-width: 968px) {
    display: flex;
    justify-content: space-between;
  }
`;

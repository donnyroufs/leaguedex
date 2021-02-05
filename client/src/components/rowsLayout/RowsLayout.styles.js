import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  width: 80%;
  max-width: 1400px;

  margin-top: 75px;

  @media screen and (min-width: 968px) {
    margin-top: 275px;
  }
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  align-items: center;
`;

export const Body = styled.div``;

import styled from "styled-components";
import { utils } from "../../GlobalStyles";

export const Container = styled.section`
  ${utils.flexCenter}
  background: ${(props) => props.theme.header};
  border: 1px solid ${(props) => props.theme.border};
  height: 300px;
  width: 80%;
  margin: 2rem auto; 
  text-align: center;
  padding: 0 2rem;

  @media screen and (min-width: 968px) {
    font-size: 1.3rem;
  }
`;

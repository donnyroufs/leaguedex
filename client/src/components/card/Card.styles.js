import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
  border: 1px solid ${(props) => props.theme.border};
  display: block;
  width: 100%;
  height: 300px;
  margin-bottom: 3rem;

  @media screen and (min-width: 968px) {
    width: 15%;
  }
`;

Container.Image = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

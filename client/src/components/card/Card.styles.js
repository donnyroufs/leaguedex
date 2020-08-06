import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
  border: 1px solid ${(props) => props.theme.border};
  display: block;
  width: 100%;
  height: 200px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    filter: saturate(125%);
  }
`;

Container.Image = styled.img`
  display: block;
  object-fit: cover;
  object-position: center right;
  width: 100%;
  height: 100%;
`;

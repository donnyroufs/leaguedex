import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  background: ${(props) => props.theme.header};
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 0 2rem;
`;

Container.Brand = styled(Link)`
  margin: 0;
`;

Container.Brand.Image = styled.img``;

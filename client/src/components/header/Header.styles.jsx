import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  background: ${(props) => props.theme.header};
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 0 2rem;
`;

Container.Brand = styled(Link)`
  margin: 0;
`;

Container.Brand.Image = styled.img``;

Container.Buttons = styled.div`
  display: none;
  @media screen and (min-width: 968px) {
    display: flex;
    width: 190px;
    justify-content: space-between;

    ${(props) =>
      props.authenticated &&
      `
      width: 310px; 
    `}
  }
`;

Container.Account = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.primary};
`;

Container.Name = styled(Link)`
  display: block;
  color: ${(props) => props.theme.secondary};
  text-decoration: none;
  margin: 0;
  padding: 0 0 0.25rem 0;
`;

import Styled from "styled-components";

export const Container = Styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  background: #fff;
  border-bottom: 2px solid #eee;
  padding: 0 2rem;
`;

Container.Brand = Styled.h3`
  margin: 0;
`;

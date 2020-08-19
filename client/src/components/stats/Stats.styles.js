import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid #3d4c5e;
  border-radius: 6px;
  height: 120px;
`;

Container.Label = styled.h3`
  font-weight: 300;
  color: ${(props) => props.theme.secondary};
  opacity: 0.5;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`;

Container.Info = styled.p`
  padding: 0;
  margin: 0.3rem 0;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2rem;
`;

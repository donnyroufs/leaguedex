import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  transition: all 0.1s ease-in;
  width: 100%;
`;

export const Info = styled.div``;
export const Details = styled.span``;

export const Lane = styled.span`
  font-weight: bold;
  margin-right: 0.3rem;
`;

export const Result = styled.span`
  font-weight: bold;
  margin-right: 0.6rem;
  color: ${(props) => (props.win ? "#4ED864" : "#BF545B")};
`;

export const ConfirmWrapper = styled.div``;

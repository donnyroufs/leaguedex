import styled from "styled-components";
import { AiFillInfoCircle } from "react-icons/ai";

export const InfoIcon = styled(AiFillInfoCircle)`
  color: ${({ theme }) => theme.primary};
  font-size: 1.55rem;
  margin: 0 0.3rem 0.1rem 0.3rem;
  transition: opacity 0.1s ease-in;

  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;

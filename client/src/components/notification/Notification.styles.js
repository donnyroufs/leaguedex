import styled from "styled-components";
import { FaBell } from "react-icons/fa";

export const Container = styled.div``;

export const IconWrapper = styled.div`
  position: relative;
  background: #232f3e;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  margin-left: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const Bubble = styled.div`
  content: "3";
  border-radius: 50%;
  height: 26px;
  width: 26px;
  display: flex;
  font-size: 0.85rem;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: absolute;
  top: -8px;
  right: -6px;
  background: ${({ theme }) => theme.primary};
`;

export const Icon = styled(FaBell)`
  font-size: 1.3rem;
`;

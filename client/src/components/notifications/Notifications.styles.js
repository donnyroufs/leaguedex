import styled from "styled-components";
import { FaBell } from "react-icons/fa";

export const Container = styled.div`
  position: relative;
`;

export const Wrapper = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-flow: column nowrap;
  position: absolute;
  border: 1px solid #263547;
  border-radius: 6px;
  box-shadow: 0px 4px 8px -4px rgba(18, 31, 46, 0.62);
  background: #18222f;
  z-index: 10;
  right: 2px;
  margin-top: 1rem;
  width: 450px;
  padding: 2rem;
`;

export const IconWrapper = styled.div`
  position: relative;
  background: #232f3e;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  margin-left: 1.25rem;
  display: flex;
  flex-flow: column nowrap;
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

export const Dropdown = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Heading = styled.h1`
  font-size: 0.9rem;
  opacity: 0.8;
  border-bottom: 1px solid #263547;
  padding-bottom: 1.5rem;
  letter-spacing: 0.1em;
  font-weight: 500;
`;

export const Footer = styled.footer`
  padding: 0;
  margin-top: 4rem;
`;

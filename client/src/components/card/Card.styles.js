import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export const Overlay = styled.div`
  background: rgba(74, 83, 95, 0.75);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 15;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Lock = styled(FaLock)`
  position: absolute;
  color: #bababa;
  height: 64px;
  width: 64px;
`;

export const Container = styled(Link)`
  position: relative;
  border: 1px solid ${(props) => props.theme.border};
  display: block;
  width: 100%;
  height: 225px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

Container.Image = styled.img`
  display: block;
  object-fit: cover;
  object-position: center right;
  width: 100%;
  height: 100%;
  /* &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    background-color: rgba(74, 83, 95, 0.85);
  } */
`;

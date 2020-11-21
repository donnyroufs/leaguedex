import styled from "styled-components";

export const Select = styled.select`
  appearance: none;
  border: none;
  outline: none;
  background: #232f3e;
  color: #83a2c5;
  height: 100%;
  width: 100%;
  padding: 0 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

export const Option = styled.option``;

export const ArrowWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 54%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  pointer-events: none;
`;

export const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  min-width: 135px;
  color: #83a2c5;
  background: #232f3e;
  cursor: pointer;
  margin: 0 0.5rem;
  border-radius: 4px;
`;

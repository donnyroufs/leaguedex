import posed from "react-pose";
import styled, { css } from "styled-components";

export const List = styled.ul`
  width: 100%;
  padding: 0%;
  margin: 0;
  list-style: none;
  min-height: 200px;
  margin-bottom: 2rem;

  ${(props) =>
    props.shared &&
    css`
      margin-top: 2rem;
    `}

  @media screen and (min-width: 1200px) {
    min-height: 400px;
  }
`;
const ListItem = posed.li({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      default: { duration: 150 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
});
export const Item = styled(ListItem)`
  position: relative;
  margin: 0;
  width: 100%;
  padding: 1.25rem;
  padding-right: 3.5rem;
  line-height: 1.7;
  background: #23303f;
  margin-bottom: 1rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  color: ${(props) => props.theme.secondary};
`;

export const Filter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 50px;
  margin-top: ${(props) => props.mt};
  width: 100%;

  @media screen and (min-width: 1200px) {
    padding: 0;
  }
`;

export const Tag = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  background: #18222f;
  outline: none;
  border: none;
  color: ${(props) => props.theme.secondary};
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 0.6rem;
  margin-right: 0.6rem;
  transition: filter 0.1s ease-in;

  ${(props) =>
    props.active &&
    css`
      background: ${(props) => props.theme.primary};
      color: #fff;
    `}

  ${(props) =>
    props.suggested &&
    css`
      background: ${(props) => props.theme.primary};
      color: #fff;
    `}

  &:hover {
    filter: brightness(1.5);
  }
`;

export const Mark = styled.mark`
  color: #62adff;
  background: transparent;
  font-weight: bold;
`;

export const Text = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;

  @media screen and (min-width: 968px) {
    font-size: 1rem;
  }

  @media screen and (min-width: 1200px) {
    font-size: 0.9rem;
  }

  @media screen and (min-width: 1400px) {
    font-size: 1.1rem;
  }

  background: #18222f;
  text-transform: none;
  font-size: 1rem;
  font-weight: normal;
  padding: 2rem;
  border-radius: 6px;
  margin-top: -0.8rem;
  width: 100%;
  pointer-events: none;
`;

export const Heading = styled.header`
  position: relative;
  display: flex;
`;

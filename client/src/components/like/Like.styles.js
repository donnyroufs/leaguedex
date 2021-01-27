import styled, { css } from "styled-components";
import { FcLike } from "react-icons/fc";

export const Like = styled(FcLike)`
  font-size: 1.5rem;
  margin: 0 0.5rem;

  transition: opacity 0.1s ease;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  ${(props) =>
    props.likedByMe &&
    css`
      opacity: 0.2;
    `}
`;

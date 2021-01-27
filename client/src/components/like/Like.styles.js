import styled, { css } from "styled-components";
import { FcLike } from "react-icons/fc";

export const Like = styled(FcLike)`
  position: relative;
  font-size: 1.5rem;
  margin: 0 0.5rem 0 0;
  transition: opacity 0.2s ease;

  ${(props) =>
    props.likedByMe &&
    css`
      opacity: 0.2;
    `}
`;

export const LikeCount = styled.span`
  z-index: 5;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  transition: opacity 0.2s ease;

  ${(props) =>
    props.likedByMe &&
    css`
      opacity: 0.2;
    `}
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.header};
  padding: 0.3rem 0.6rem;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  transition: opacity 0.2s ease;

  &:hover {
    cursor: pointer;
    ${Like}, ${LikeCount} {
      opacity: ${(props) => props.user && 1};
    }
  }
`;

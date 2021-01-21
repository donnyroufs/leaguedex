import styled, { css } from "styled-components";
import { ReactComponent as Confirm } from "./yes-icon.svg";
import { ReactComponent as Cancel } from "./no-icon.svg";

const sharedProps = css`
  opacity: ${(props) => (props.checked ? 1 : 0.4)};
  cursor: pointer;
  transition: 0.1s ease-in-out all;
  width: 18px;
  height: 18px;

  &:hover {
    opacity: 1;
  }
`;

export const MarkConfirm = styled(Confirm)`
  ${sharedProps};
`;

export const MarkCancel = styled(Cancel)`
  ${sharedProps};
  margin-left: 0.5rem;
`;

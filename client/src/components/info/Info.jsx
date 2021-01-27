import React from "react";
import { useModal } from "../../hooks/useModal";
import * as SC from "./Info.styles";

export function Info({ modalName }) {
  const { setModal } = useModal();

  function handleClick(e) {
    e.preventDefault();
    setModal(modalName);
  }

  return <SC.InfoIcon onClick={handleClick} />;
}

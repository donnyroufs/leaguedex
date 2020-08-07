import React from "react";
import { Container, Title } from "./Modal.styles";

const Modal = ({ title, children, isOpen, reverse, clickedOutside }) => {
  return (
    <Container isOpen={isOpen} reverse={reverse}>
      <Container.Inner
        isOpen={isOpen}
        ref={clickedOutside}
        register={title === "register"}
        reverse={reverse}
      >
        <Container.Header>
          <Title>{title}</Title>
        </Container.Header>
        {children}
      </Container.Inner>
    </Container>
  );
};

export default Modal;

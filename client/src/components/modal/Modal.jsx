import React from "react";
import { Container, Title } from "./Modal.styles";

const Modal = ({ title, children, isOpen, clickedOutside }) => {
  return (
    <Container isOpen={isOpen}>
      <Container.Inner
        isOpen={isOpen}
        ref={clickedOutside}
        register={title === "register"}
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

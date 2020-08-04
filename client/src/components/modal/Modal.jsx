import React from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Container, Title } from "./Modal.styles";

const Modal = ({ title, children, setModal, isOpen }) => {
  const ref = useOnclickOutside(() => {
    setModal(null);
  });

  return (
    <Container isOpen={isOpen}>
      <Container.Inner isOpen={isOpen} ref={ref}>
        <Container.Header>
          <Title>{title}</Title>
        </Container.Header>
        {children}
      </Container.Inner>
    </Container>
  );
};

export default Modal;

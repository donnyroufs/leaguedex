import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Container, Lock, Overlay } from "./Card.styles";

const Card = ({ image, name }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Container to="/">
        <Overlay>
          <Lock />
        </Overlay>
        <Container.Image src={image} alt={name} />
      </Container>
    );
  }

  return (
    <Container to={`/champion/` + name}>
      <Container.Image src={image} alt={name} />
    </Container>
  );
};

export default Card;

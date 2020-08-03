import React from "react";
import { Container } from "./Card.styles";

const Card = ({ image, name }) => {
  return (
    <Container to={`/champion/` + name}>
      <Container.Image src={image} alt={name} />
    </Container>
  );
};

export default Card;

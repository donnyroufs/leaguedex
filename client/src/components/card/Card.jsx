import React from "react";
import { Container, Lock, Overlay } from "./Card.styles";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useAuth } from "../../hooks/useAuth";

const Card = ({ image, name }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container to="/" locked="true">
        <Overlay>
          <Lock />
        </Overlay>
        <Container.Image
          src={image}
          alt={name}
          effect="blur"
          height="100%"
          delayTime={500}
          width="100%"
        />
      </Container>
    );
  }

  return (
    <Container to={`/champion/` + name}>
      <Container.Image
        src={image}
        alt={name}
        effect="blur"
        height="100%"
        width="100%"
        delayTime={100}
      />
    </Container>
  );
};

export default Card;

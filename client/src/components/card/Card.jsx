import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Container, Lock, Overlay } from "./Card.styles";
import "react-lazy-load-image-component/src/effects/blur.css";

const Card = ({ image, name }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user.summoner) {
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
        delayTime={500}
      />
    </Container>
  );
};

export default Card;

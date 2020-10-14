import React from "react";
import { Container, ImageWrapper } from "./About.styles";
import ReactPlayer from "react-player";

const About = (props) => {
  return (
    <Container>
      <ImageWrapper>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=XoYu7K6Ywkg"
          controls={true}
          width="100%"
          height="100%"
        />
      </ImageWrapper>
    </Container>
  );
};

export default About;

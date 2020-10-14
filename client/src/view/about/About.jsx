import React from "react";
import {
  Container,
  ImageWrapper,
  Article,
  Background,
  GithubLink,
} from "./About.styles";
import ReactPlayer from "react-player";
import { FaGithub } from "react-icons/fa";

const BreakLine = () => (
  <>
    <br />
    <br />
  </>
);

const About = (props) => {
  return (
    <Container>
      <Background />
      <ImageWrapper>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=XoYu7K6Ywkg"
          controls={true}
          width="100%"
          height="100%"
        />
      </ImageWrapper>
      <Article>
        <Article.Title>What is Leaguedex?</Article.Title>
        <Article.Body>
          Then Leaguedex is for you. Keep track of all your played matchups in a
          digital environment where you can write down your own personalized
          notes to never ever forget again!
          <BreakLine />
          Perhaps people frequently ask you about how to play a certain champion
          and you have been planning to write an in depth guide on how to play
          but never really took the time to do so, since it costs a lot of free
          time.. Well don’t worry!
          <BreakLine />
          Leaguedex has this covered for you. You can share your dex with others
          or keep it to yourself. Whatever suits you.
        </Article.Body>
        <Article.Footer>
          <GithubLink
            href="https://github.com/donnyroufs/leaguedex"
            target="_blank"
          >
            <FaGithub size="32" />
            Github
          </GithubLink>
        </Article.Footer>
      </Article>
    </Container>
  );
};

export default About;

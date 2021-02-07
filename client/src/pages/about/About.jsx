import React from "react";
import { Container, Article, GithubLink } from "./About.styles";
import { FaGithub, FaCoffee } from "react-icons/fa";

const About = () => {
  return (
    <Container>
      <Article>
        <Article.Title>What is Leaguedex?</Article.Title>
        <Article.Body>
          Leaguedex is a web application created for League of Legends players
          who like to write notes for a given matchup. A matchup could be Annie
          versus Anivia in mid lane.
        </Article.Body>
        <Article.Body>
          You can create matchups manually, create a matchup when ur just about
          to join summoners rift or even better, Leaguedex keeps track of your
          played matchups and will take an educated guess and let you know about
          it!
        </Article.Body>
        <Article.Body>
          Besides using this as your personal note taking app, you can also
          decide to share your matchups with others.
        </Article.Body>
        <Article.Body>
          Leaguedex is created by a single web developer who likes to create
          free stuff for others to use. However I would appreciate donations to
          pay the server costs each month. You can do so by buying me a coffee!
        </Article.Body>
        <Article.Footer>
          <GithubLink
            href="https://github.com/donnyroufs/leaguedex"
            target="_blank"
          >
            <FaGithub size="32" />
            Github
          </GithubLink>
          <GithubLink
            href="https://www.buymeacoffee.com/iamchets"
            target="_blank"
          >
            <FaCoffee size="64" style={{ marginRight: "1rem" }} />
            Donate
          </GithubLink>
        </Article.Footer>
      </Article>
    </Container>
  );
};

export default About;

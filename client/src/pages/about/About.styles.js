import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;

  margin-bottom: 100px;

  @media screen and (min-width: 968px) {
    width: 100%;
    margin-top: 275px;
  }
`;

export const ImageWrapper = styled.div`
  height: 300px;
  width: 100%;

  @media screen and (min-width: 968px) {
    height: 500px !important;
  }
`;

export const Article = styled.article`
  background: ${(props) => props.theme.header};
  padding: 0rem 4rem 2rem 4rem;
`;

Article.Title = styled.h1`
  font-weight: 1000;
  color: ${(props) => props.theme.primary};
  margin-top: 6rem;
  margin-bottom: 2rem;
`;

Article.Body = styled.p`
  line-height: 2.1;
  opacity: 0.75;

  @media screen and (min-width: 968px) {
    font-size: 1.1rem;
  }
`;
Article.Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

export const Background = styled.div`
  background-color: #18222f;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1;
  /* height: 120vh; */
  height: 900px;
  width: 100%;
  overflow: hidden;
  @media screen and (min-width: 968px) {
    min-height: 900px;
    height: 90vh;
  }
`;

export const GithubLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.secondary};
  text-decoration: none;
  width: 100px;
`;

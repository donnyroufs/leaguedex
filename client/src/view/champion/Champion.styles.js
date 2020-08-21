import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;

  @media screen and (min-width: 968px) {
    margin-top: 100px;
  }
`;

Container.Inner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 3rem 0;
  @media screen and (min-width: 968px) {
    width: 95%;
    max-width: 1400px;
    margin: 0 auto;
  }
`;

Container.Wrapper = styled.div`
  width: 80%;
  @media screen and (min-width: 968px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 6rem 0 3rem 0;
    width: 100%;
  }
`;

Container.Image = styled.img`
  object-fit: cover;
  border-bottom: 1px solid ${(props) => props.theme.border};

  @media screen and (min-width: 1200px) {
    border: 1px solid ${(props) => props.theme.border};
    margin-left: 3rem;
    height: 350px;
    width: 500px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-image: ${(props) => `url(${props.img})`};
  height: 300px;
  width: 100vw;
  background-size: cover;

  @media screen and (min-width: 968px) {
    height: 600px;
  }
`;

export const Results = styled.div`
  width: 80%;
  margin-top: 3rem;
  display: grid;
  margin-bottom: 3rem;

  @media screen and (min-width: 968px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.5rem;
    width: 100%;
  }
`;

export const Card = styled(Link)`
  position: relative;
  text-decoration: none;
  height: 100%;
  padding: 1rem 2rem;
  gap: 0.5rem;
  width: 100%;
  background: #33465b;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "icon played wins"
    "icon lane losses";

  align-items: center;
  text-transform: uppercase;
  color: white;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

Card.Image = styled.img`
  grid-area: icon;
  position: relative;
  z-index: 5;
  height: 86px;
  width: 86px;
`;

Card.Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.3;
  z-index: 0;
  object-fit: cover;
`;

export const Details = styled.div`
  z-index: 10;
  grid-area: ${(props) => props.name};
`;

Details.Title = styled.h5`
  letter-spacing: 0.03em;
  color: #8ba1ba;
  margin: 0 0 0.5rem 0;
  padding: 0;
  font-size: 0.7rem;
`;

Details.Text = styled.p`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.secondary};
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Title = styled.h2`
  margin: 0 0 2rem 0;
`;

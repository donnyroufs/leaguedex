import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  width: 80%;
  max-width: 1400px;
`;

Container.Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 100px;
  justify-content: center;

  @media screen and (min-width: 968px) {
    justify-content: space-between;
  }
`;

Container.Header.Left = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 128px 1fr;
  grid-template-areas:
    "image title"
    "image toggle";
  align-items: center;

  @media screen and (min-width: 968px) {
    grid-template-columns: 128px 300px;
  }
`;

Container.Body = styled.main`
  overflow-x: auto;
  border-radius: 6px;
  min-height: 200px;
  table {
    border-collapse: collapse;
    min-width: 600px;
    width: 100%;
    color: ${(props) => props.theme.secondary};
  }

  thead {
    color: #fff;
    border-bottom: 20px solid ${(props) => props.theme.background};
  }

  thead > tr {
    height: 80px;
    background: ${(props) => props.theme.primary};
  }

  tbody > tr {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  /* tbody > tr:nth-child(even) {
    background: #293748;
  } */

  tbody > tr:hover {
    /* background: #3a4d65; */
    background: #293748;
  }

  tr {
    height: 64px;
    border-bottom: 3px solid ${(props) => props.theme.background};
    background: #232f3e;
  }

  td {
    text-align: center;
  }
`;

export const Title = styled.h3`
  grid-area: title;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

export const Image = styled.img`
  grid-area: image;
  border-radius: 100%;
  height: 96px;
  width: 96px;
`;

export const ToggleContainer = styled.div`
  grid-area: toggle;
  width: fit-content;
`;

export const Results = styled.div`
  width: 80%;
  margin-top: 3rem;
  display: grid;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media screen and (min-width: 968px) {
    grid-template-columns: repeat(3, 1fr);
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

// export const Title = styled.h2`
//   margin: 0 0 2rem 0;
// `;

export const CreateMatchupBtn = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: ${({ theme }) => theme.primary};
  border-radius: 100%;
  height: 48px;
  width: 48px;
  bottom: 64px;
  right: 64px;

  outline: none;
  border: none;

  font-size: 1.5rem;
  transition: 0.3s ease-in-out opacity;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

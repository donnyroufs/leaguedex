import styled from "styled-components";

export const Container = styled.section`
  height: 100%;

  @media screen and (min-width: 1200px) {
    display: flex;
    min-height: calc(100vh - 100px);
  }
`;

Container.Left = styled.aside`
  position: relative;
  display: flex;

  @media screen and (min-width: 1200px) {
    position: fixed;
    top: 100px;
    left: 0;
    height: calc(100vh - 100px);
    width: 30%;
    z-index: 10;
  }
`;

Container.Right = styled.section`
  @media screen and (min-width: 1200px) {
    width: 70%;
    margin-left: 30%;
    display: flex;
    justify-content: center;
  }
`;

Container.Right.Inner = styled.div`
  @media screen and (min-width: 1200px) {
    width: 70%;
  }
`;

export const Image = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(${(props) => (props.you ? "0" : "100%")});
  opacity: ${(props) => (props.you ? "0.7" : "0.35")};
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0 1.5rem;
  margin: 3rem 0;

  @media screen and (min-width: 1200px) {
    padding: 0;
    margin: 4rem 0 4rem 0;
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Versus = styled.div`
  z-index: 5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 5rem;
  color: #fff;
  text-shadow: 3px 1px 10px rgba(150, 150, 150, 1);
  pointer-events: none;
`;

export const Status = styled.div`
  z-index: 5;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 3.5rem;
  color: #fff;
  text-shadow: 3px 1px 10px rgba(150, 150, 150, 1);
  pointer-events: none;

  @media screen and (min-width: 1200px) {
    top: 60%;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  @media screen and (min-width: 1200px) {
    align-items: flex-start;
  }
`;

Main.Title = styled.h1`
  color: ${(props) => props.theme.secondary};
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;
`;

Main.Header = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (min-width: 1200px) {
    justify-content: space-between;
    margin-bottom: 2rem;
  }
`;

export const Notes = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  list-style: none;
  margin: 2rem 0;
  width: 100%;
  padding: 0 1.5rem;

  @media screen and (min-width: 1200px) {
    margin: 0 0 3rem 0;
    padding: 0;
  }
`;

Notes.Note = styled.li`
  text-align: left;
  width: 100%;
  background: #2c3a4a;
  padding: 1.25rem;
  color: ${(props) => props.theme.secondary};
  border-radius: 6px;
  margin-top: 1.5rem;
`;

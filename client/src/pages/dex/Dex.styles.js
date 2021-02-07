import styled, { css } from "styled-components";

export const Container = styled.section`
  background: #111c29;
`;

Container.Inner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 80%;
  margin: 0 auto;
  max-width: 1400px;
  /* height: calc(100vh - 170px); */
  padding-top: 2rem;
  min-height: 100vh;
  /* padding-top: 75px; */

  @media screen and (min-width: 968px) {
    margin-top: 175px;
    padding-top: 50px;
  }

  @media screen and (min-width: 1200px) {
    flex-flow: row nowrap;
  }
`;

Container.Left = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 6;
`;

Container.Right = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 8;

  @media screen and (min-width: 1200px) {
    margin-left: 50px;
  }
`;

export const Header = styled.header`
  height: ${(props) => (props.stats ? "350px" : "100px")};
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 500px) {
    height: ${(props) => (props.stats ? "200px" : "100px")};
    flex-flow: row wrap;
  }

  @media screen and (min-width: 1200px) {
    height: 100px;
    min-height: 100px;
    flex-flow: row nowrap;
  }
`;

Header.Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

Header.Right = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: 1200px) {
    justify-content: flex-end;
  }

  ${(props) =>
    props.type === "stats" &&
    css`
      display: flex;
      flex-flow: column nowrap;
    `}
`;

export const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43px;
  background: #e91e63;
  border-radius: 6px;
  padding: 0.8rem 1.2rem;
  color: white;
  margin-right: 0rem;
  cursor: default;
`;

export const Text = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;

  @media screen and (min-width: 968px) {
    font-size: 1rem;
  }

  @media screen and (min-width: 1200px) {
    font-size: 0.9rem;
  }

  @media screen and (min-width: 1400px) {
    font-size: 1rem;
  }

  ${(props) =>
    props.type === "runes" &&
    css`
      background: #18222f;
      text-transform: none;
      font-size: 1rem;
      font-weight: normal;
      padding: 2rem;
      border-radius: 6px;
    `}
`;

export const Highlight = styled.mark`
  background: none;
  color: #3f8be4;
  font-weight: bold;
  font-size: 1rem;
  padding: 0 0.4rem;
`;

export const Runes = styled.section`
  display: flex;
  flex-flow: column nowrap;
  pointer-events: none;
  margin-top: 4rem;

  @media screen and (min-width: 968px) {
    margin-top: 6rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #3f8be4;
  margin-left: 0.5rem;
`;

export const Notes = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 2rem;
  margin-bottom: 6rem;

  @media screen and (min-width: 968px) {
    margin-bottom: 4rem;
    margin-top: 1.2rem;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 968px) {
    border-radius: 6px;
    background: #0b1623;
  }
`;

Box.Inner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 2rem;

  @media screen and (min-width: 968px) {
    padding: 2rem;
  }
`;

export const Column = styled.div`
  position: relative;
  flex: ${(props) => props.flex};
  justify-content: center;
  align-items: center;
`;

Column.Inner = styled.div`
  height: calc(100% - 90px);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
`;

export const Image = styled.img`
  display: block;
`;

export const SubTitle = styled.p`
  padding: 0;
  margin: 0;
  font-weight: bold;
  color: #8ba1ba;
  text-transform: uppercase;
  opacity: 0.4;
  font-size: 0.8rem;
  margin-bottom: 0.3rem;

  @media screen and (min-width: 1750px) {
    font-size: 0.95rem;
  }
`;

export const SmallerTitle = styled.h2`
  font-weight: bold;
  font-size: 1.7rem;
  padding: 0;
  margin: 0;
  color: ${(props) => (props.type === "vs" ? "#3F8BE4" : "#B8D0EC")};
  @media screen and (min-width: 1750px) {
    font-size: 2rem;
  }
`;

export const StatsWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

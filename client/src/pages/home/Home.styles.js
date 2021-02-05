import styled from "styled-components";
import { Button as GlobalButton } from "../../GlobalStyles";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

export const Wrapper = styled.div`
  @media screen and (min-width: 968px) {
    margin-top: 175px;
  }
`;

export const Container = styled.div`
  background: ${(props) => props.theme.header};
  min-height: 560px;

  @media screen and (min-width: 968px) {
    min-height: auto;
  }
`;

export const Hero = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  max-width: 1400px;
  padding: 2rem 2rem 8rem 2rem;

  @media screen and (min-width: 968px) {
    height: calc(100vh - 175px);
    padding: 0;
    justify-content: center;
    align-items: center;
    padding-bottom: 3rem;
  }
`;

Hero.Inner = styled.div`
  display: flex;
  flex-flow: column nowrap;

  @media screen and (min-width: 968px) {
    flex-flow: row nowrap;
  }
`;

Hero.Footer = styled.footer`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
`;

export const HeroBody = styled.div`
  order: 2;
  flex: 1;
  @media screen and (min-width: 968px) {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    max-width: 475px;
    padding-bottom: 4rem;
    order: 1;
    margin-right: 8rem;
  }
`;
export const HeroImageWrapper = styled.div`
  display: none;

  @media screen and (min-width: 968px) {
    display: flex;
    order: 2;
    min-height: 423px;
    min-width: 375px;
  }
`;

export const Image = styled.img`
  height: 423px;
  width: 423px;
  object-fit: cover;
  filter: drop-shadow(0px 4px 44px #23303f);
`;

export const Title = styled.h1`
  text-transform: uppercase;
  line-height: 1.3;
  font-size: 2.2rem;
  padding-top: 1rem;
  opacity: ${(props) => (props.active ? 1 : 0)};

  transition: all 0.3s ease;
`;

export const Paragraph = styled.p`
  color: #587291;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

export const Button = styled(GlobalButton)`
  width: 100%;

  @media screen and (min-width: 968px) {
    width: fit-content;
  }
`;

export const NavigateButton = styled.button`
  outline: none;
  border: none;
  background: ${({ theme }) => theme.background};
  height: 64px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bddbff;
  cursor: pointer;
  transition: opacity ease 0.1s;

  &:hover {
    opacity: 0.6;
  }
  @media screen and (min-width: 968px) {
    height: 86px;
    width: 86px;
  }
`;

export const LeftChevron = styled(BsChevronLeft)`
  color: #bddbff;
  height: 20px;
  width: 20px;
`;

export const RightChevron = styled(BsChevronRight)`
  color: #bddbff;
  height: 20px;
  width: 20px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  @media screen and (min-width: 968px) {
    justify-content: flex-start;
  }
`;

export const Discord = styled(FaDiscord)`
  font-size: 24px;
  color: #495b6e;
  cursor: pointer;
  margin-top: 1.5rem;

  transition: opacity 0.1s ease;

  &:hover {
    opacity: 0.7;
  }

  @media screen and (min-width: 968px) {
    margin-top: 0.3rem;
    margin-left: 1.5rem;
  }
`;

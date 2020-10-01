import styled, { css } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  /* Quick ugly fix */
  margin-top: -100px;

  @media screen and (min-width: 968px) {
    height: calc(100vh - 175px);
  }
`;

Container.Inner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  border-top: 1px solid #435d75;

  @media screen and (min-width: 968px) {
    flex-flow: row nowrap;
  }
`;

Container.Wrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  opacity: ${(props) => (props.selected ? 1 : 0.45)};
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  object-fit: cover;

  @media screen and (min-width: 968px) {
    height: 100%;
  }

  &:hover {
    opacity: 1;
    ${(props) =>
      props.role &&
      css`
        transform: scale(1.1);
      `}
  }
`;

Container.Image = styled(LazyLoadImage)`
  width: 100%;
  object-position: top center;
  object-fit: cover;
`;

Container.Role = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  text-transform: uppercase;
  margin-bottom: 6rem;
`;

Container.Text = styled.h2`
  position: absolute;
  margin: 0 auto;
  bottom: 50px;
  color: #fcfcfc;
  text-shadow: 2px 2px #212121;
`;

export const Footer = styled.footer`
  height: 120px;
  width: 100%;
  display: grid;
  place-items: center;
`;

Footer.Text = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: bold;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  font-size: 2.5rem;
  color: #58697c;
`;

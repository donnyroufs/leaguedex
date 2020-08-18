import styled, { css } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Container = styled.section`
  overflow: hidden;
  display: flex;
  height: calc(100vh - 100px);
  justify-content: space-between;
`;

Container.Wrapper = styled.div`
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.selected ? 1 : 0.45)};
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

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
  object-position: center center;
  object-fit: cover;
`;

Container.Role = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  text-transform: uppercase;
  margin-bottom: 6rem;
`;

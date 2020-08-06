import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  line-height: ${(props) => props.theme.lineHeight};

  ${(props) =>
    props.secondary &&
    css`
      padding: 10px;

        > p {
            align-self: flex-start;
			margin: 10px;
        }
    `}
`;

Container.Image = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
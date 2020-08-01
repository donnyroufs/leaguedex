import { createGlobalStyle, css } from "styled-components";
import { normalize } from "styled-normalize";

export const utils = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default createGlobalStyle`
    ${normalize}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
`;

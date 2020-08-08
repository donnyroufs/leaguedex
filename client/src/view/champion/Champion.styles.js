import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  max-width: 1400px;

  @media screen and (min-width: 968px) {
    margin-top: 3rem;
    flex-flow: row nowrap;
  }
`;

Container.Image = styled.img`
  object-fit: cover;

  @media screen and (min-width: 968px) {
    margin-left: 3rem;
    height: 350px;
    width: 500px;
  }
`;
Container.Info = styled.div`
  margin: 3.5rem 3rem 3rem 3rem;
`;

Container.Tags = styled.div`
  margin-top: 1.5rem;
  display: flex;
`;

export const Title = styled.h2`
  margin-top: 0;
  color: ${(props) => props.theme.primary};
`;

export const Text = styled.p`
  line-height: ${(props) => props.theme.lineHeight};
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.tag};
  padding: 0.5rem 0.8rem;
  border-radius: 3px;
  margin-right: 1rem;
`;

// export const Container = styled.section`
//     display: flex;
//     flex-flow: column nowrap;
//     justify-content: space-between;

//     width: 100%;
//     height: 100%;
//     max-width: 1400px;

//     margin: 0 auto;

//     line-height: ${(props) => props.theme.lineHeight};

//     @media screen and (min-width: 968px) {
//         padding: 50px;
//     }
// `;

// export const ChampionInfo = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;

//     @media screen and (min-width: 968px) {
//         flex-direction: row;
//         flex-wrap: nowrap;

//         --gap: 40px;
//         margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
//         width: calc(100% + var(--gap));

//         > * {
//             margin: var(--gap) 0 var(--gap) var(--gap);
//         }
//     }

//     .description {
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;

//         padding: 10px;

//         @media screen and (min-width: 968px) {
//             background-color: ${(props) => props.theme.header};
//             border: 1px solid ${(props) => props.theme.border};
//         }

//         > p {
//             align-self: flex-start;
//             margin: 10px;

//             :first-child {
//                 color: ${(props) => props.theme.primary};
//                 font-weight: bold;
//                 text-transform: uppercase;
//             }
//         }
//     }

//     img {
//         display: block;
//         object-fit: cover;

//         max-width: 100%;

//         @media screen and (min-width: 968px) {
//             border: 1px solid ${(props) => props.theme.border};
//         }
//     }
// `;

// export const Matchups = styled.div`
//     width: 100%;
//     height: 100%;

//     padding: 10px;

//     @media screen and (min-width: 968px) {
//         background-color: ${(props) => props.theme.header};
//         border: 1px solid ${(props) => props.theme.border};
//     }

//     .row {
//         min-height: 50px;
//         margin: 10px;

//         background-color: ${(props) => props.theme.third};
//     }
// `;

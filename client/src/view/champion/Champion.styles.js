import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  max-width: 1400px;
  max-height: 350px;

  @media screen and (min-width: 1200px) {
    margin-top: 3rem;
    flex-flow: row nowrap;
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
Container.Info = styled.div`
  margin: 3.5rem 3rem 3rem 3rem;

  @media screen and (min-width: 1200px) {
    margin: 0 3rem;
    background: ${(props) => props.theme.header};
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    padding: 3rem;
    border: 1px solid ${(props) => props.theme.border};
  }
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

import React from "react";
import { Container } from "./Home.styles";

const Home = ({ status, data }) => {
  if (status.loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h3>Home</h3>
      {status === "success" &&
        data.map(({ id, name }) => <p key={id}>{name}</p>)}
    </Container>
  );
};

export default Home;

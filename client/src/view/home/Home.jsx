import React from "react";
import useFetch from "../../hooks/useFetch";
import { Container } from "./Home.styles";

const Home = () => {
  const { data, loading } = useFetch("/note");

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h3>Home</h3>
      {data.map(({ _id, body }) => (
        <p key={_id}>{body}</p>
      ))}
    </Container>
  );
};

export default Home;

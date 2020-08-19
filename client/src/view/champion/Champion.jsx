import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./Champion.styles.js";

const Champion = ({ loading, matchups }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      {matchups.map((matchup) => (
        <Link
          to={`/dex/${matchup.id}`}
          style={{
            textDecoration: "none",
            color: "white",
            marginBottom: "1rem",
          }}
        >
          vs {matchup.championB.name}
        </Link>
      ))}
    </Container>
  );
};

export default Champion;

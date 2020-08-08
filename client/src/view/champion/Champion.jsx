import React from "react";
import { Container, Title, Text, Tag } from "./Champion.styles.js";

const Champion = ({ status, data }) => {
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status !== "success") {
    return <p>Something went wrong</p>;
  }

  return (
    <Container>
      <Container.Image src={data.image} alt={data.name} />
      <Container.Info>
        <Title>{data.name}</Title>
        <Text>{data.lore}</Text>
        <Container.Tags>
          {data.tags.split(",").map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Container.Tags>
      </Container.Info>
    </Container>
  );
};

export default Champion;

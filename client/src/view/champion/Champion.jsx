import React from "react";
import { Container } from "./Champion.styles";

const Champion = ({ isLoading, status, data }) => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (status !== "success") {
        return <p>Something went wrong</p>
    }

    return (
        <Container>
            <Container.Image src={data.image} alt={data.name}></Container.Image>
            <Container secondary>
                <p>{data.name}</p>
                <p>{data.lore}</p>
                <p>{data.tags}</p>
            </Container>
            
        </Container>
    );
};

export default Champion;

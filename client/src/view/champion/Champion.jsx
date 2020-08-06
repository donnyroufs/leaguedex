import React from "react";
import { Container } from "./Champion.styles";

const Champion = ({ isLoading, status, data }) => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    console.log(status);
    console.log(data);
    return (
        <Container>
            
            {status === "success" && 
                <Container>
                    <p>{data.name}</p>
                    <p>{data.lore + data.tags.split(',')[0]}</p>
                    <p>{data.lore + data.tags.split(',')[0]}</p>
                </Container>
            }
            
        </Container>
    );
};

export default Champion;

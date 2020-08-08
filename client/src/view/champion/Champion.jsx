import React from "react";
import { Container, ChampionInfo, Matchups } from "./Champion.styles.js";

const Champion = ({ isLoading, status, data }) => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (status !== "success") {
        return <p>Something went wrong</p>
    }

    return (
        <Container>
            <ChampionInfo>
                <img src={data.image} alt={data.name}></img>
                <div class="description">
                    <p>{data.name}</p>
                    <p>{data.lore}</p>
                    <p>{data.tags}</p>
                </div>
            </ChampionInfo>
            <Matchups>
                <div class="row"></div>
                <div class="row"></div>
            </Matchups>
        </Container>
    );
};

export default Champion;

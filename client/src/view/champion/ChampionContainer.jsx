import React from "react";
import Champion from "./Champion";
import { useQuery } from "react-query";

const fetchChampion = async (name) => {
    const response = await fetch(`/champion/${name}`);
    return response.json();
}

const ChampionContainer = ({ match: { params: { name }} }) => {
    const response = useQuery("champion", () => fetchChampion(name));
    return <Champion {...response} />;
}

export default ChampionContainer;
import React from "react";
import Home from "./Home";
import { useQuery } from "react-query";

const fetchChampions = async () => {
  const response = await fetch("/champion");
  return response.json();
};

const HomeContainer = () => {
  const response = useQuery("champions", fetchChampions);
  return <Home {...response} />;
};

export default HomeContainer;

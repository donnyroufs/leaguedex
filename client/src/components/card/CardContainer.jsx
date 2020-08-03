import React from "react";
import Card from "./Card";

const CardContainer = ({ champion }) => {
  return <Card {...champion} />;
};

export default CardContainer;

import React from "react";
import Card from "./Card";

const CardContainer = ({ champion, content, href }) => {
  return <Card {...champion} content={content} href={href} />;
};

export default CardContainer;

import React from "react";
import Card from "../card/CardContainer";
import * as SC from "./CardsGrid.styles";

const CardsGrid = ({
  data,
  filterFn,
  sortFn,
  contentFn,
  cardHrefFn = () => null,
}) => {
  return (
    <SC.Container>
      {data.length > 0 &&
        data
          .filter(filterFn)
          .sort(sortFn)
          .map((champion) => (
            <Card
              key={champion.name}
              champion={champion}
              content={contentFn(champion)}
              href={cardHrefFn(champion.name)}
            />
          ))}
    </SC.Container>
  );
};

export default CardsGrid;

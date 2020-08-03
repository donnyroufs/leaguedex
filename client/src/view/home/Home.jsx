import React from "react";
import { SEARCH_WIDGET, INFO_WIDGET } from "../../constants";
import Widget from "../../components/widget/WidgetContainer";
import Card from "../../components/card/CardContainer";
import { Container } from "./Home.styles";

const Home = ({ status, data }) => {
  if (status.loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Container.Widgets>
        <Widget type={INFO_WIDGET} />
        <Widget type={SEARCH_WIDGET} />
      </Container.Widgets>
      <Container secondary>
        {status === "success" &&
          data.map((champion) => (
            <Card key={champion.id} champion={champion} />
          ))}
      </Container>
    </Container>
  );
};

export default Home;

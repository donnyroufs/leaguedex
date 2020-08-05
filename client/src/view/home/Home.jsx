import React from "react";
import InfoWidget from "../../components/widget/InfoWidget";
import SearchWidget from "../../components/widget/SearchWidget";
import Card from "../../components/card/CardContainer";
import { Container } from "./Home.styles";

const Home = ({ status, data }) => {
  if (status.loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Container.Widgets>
        <InfoWidget />
        <SearchWidget />
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

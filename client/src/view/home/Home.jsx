import React, { useState } from "react";
import InfoWidget from "../../components/widget/InfoWidget";
import SearchWidget from "../../components/widget/SearchWidget";
import Card from "../../components/card/CardContainer";
import { Container } from "./Home.styles";

const Home = ({ champions, loading }) => {
  const [value, setValue] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Container.Widgets>
        <InfoWidget />
        <SearchWidget value={value} setValue={setValue} />
      </Container.Widgets>
      <Container secondary>
        {champions.length > 0 &&
          champions
            .filter((champ) => champ.name.toLowerCase().includes(value))
            .map((champion) => <Card key={champion.id} champion={champion} />)}
      </Container>
    </Container>
  );
};

export default Home;

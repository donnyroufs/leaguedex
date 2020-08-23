import React, { useState } from "react";
import InfoWidget from "../../components/widget/InfoWidget";
import SearchWidget from "../../components/widget/SearchWidget";
import Card from "../../components/card/CardContainer";
import { Container } from "./Home.styles";

const Home = ({ champions, info }) => {
  const [value, setValue] = useState("");

  return (
    <Container>
      <Container.Widgets>
        <InfoWidget {...info} />
        <SearchWidget value={value} setValue={setValue} />
      </Container.Widgets>
      <Container secondary>
        {champions.length > 0 &&
          champions
            .filter((champ) => champ.name.toLowerCase().includes(value))
            .map((champion) => (
              <Card key={champion.name} champion={champion} />
            ))}
      </Container>
    </Container>
  );
};

export default Home;

import React from "react";
import {
  Container,
  Header,
  Results,
  Card,
  Title,
  Details,
} from "./Champion.styles.js";
import {
  Form,
  Group,
  Input,
  Label,
  Select,
} from "../../components/styles/Form";
import { Button } from "../../GlobalStyles";

const LANES = ["All", "Top", "Jungle", "Mid", "Adc", "Support"];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Champion = ({
  loading,
  matchups,
  name,
  values,
  setValues,
  onSearch,
  championA,
}) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  const handleOnChange = (e) => {
    e.persist();
    setValues((old) => ({
      ...old,
      [e.target.name]: capitalizeFirstLetter(e.target.value),
    }));
  };

  return (
    <Container>
      <Header img={championA.splash} />
      <Container.Inner>
        <Container.Wrapper>
          <Title>{name}</Title>
          <Form champion onSubmit={onSearch}>
            <Group champion>
              <Label>Versus</Label>
              <Input
                type="text"
                placeholder="Enter champion"
                name="championB"
                onChange={handleOnChange}
                value={values.championB}
              />
            </Group>
            <Group champion>
              <Label>Lane</Label>
              <Select name="lane" onChange={handleOnChange} value={values.lane}>
                {LANES.map((lane) => (
                  <option
                    key={lane}
                    value={lane}
                    style={{
                      display: "block",
                      paddingBottom: "1rem",
                      backgroundColor: "#2c3a4a",
                    }}
                  >
                    {lane}
                  </option>
                ))}
              </Select>
            </Group>
            <Button style={{ width: "100%", fontSize: "1rem" }}>Search</Button>
          </Form>
        </Container.Wrapper>
        <Results>
          {matchups.length <= 0 && "No matchups found."}
          {matchups.map((matchup) => (
            <Card to={`/dex/${matchup.id}`} key={matchup.id}>
              <Card.Background
                src={matchup.championB.splash}
                alt={matchup.championB.name}
              />
              <Card.Image
                src={matchup.championB.icon}
                alt={matchup.championB.name}
              />
              <Details name="played">
                <Details.Title>played</Details.Title>
                <Details.Text>{matchup.games_played}</Details.Text>
              </Details>
              <Details name="wins">
                <Details.Title>wins</Details.Title>
                <Details.Text>{matchup.games_won}</Details.Text>
              </Details>
              <Details name="lane">
                <Details.Title>lane</Details.Title>
                <Details.Text>{matchup.lane}</Details.Text>
              </Details>
              <Details name="losses">
                <Details.Title>losses</Details.Title>
                <Details.Text>{matchup.games_lost}</Details.Text>
              </Details>
            </Card>
          ))}
        </Results>
      </Container.Inner>
    </Container>
  );
};

export default Champion;
